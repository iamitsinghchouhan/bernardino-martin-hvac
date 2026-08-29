param(
  [string]$BaseUrl = "http://localhost:4174"
)

$paths = @(
  '/hvac-malibu','/hvac-burbank','/hvac-gardena','/hvac-glendale','/hvac-torrance','/hvac-hawthorne','/hvac-inglewood','/hvac-el-segundo','/hvac-long-beach','/hvac-culver-city','/hvac-los-angeles','/hvac-santa-monica','/hvac-hermosa-beach','/hvac-redondo-beach','/hvac-west-hollywood','/hvac-manhattan-beach','/hvac-san-fernando-valley','/hvac-playa-del-rey','/hvac-hollywood','/hvac-pasadena','/hvac-north-hollywood','/hvac-van-nuys','/hvac-chatsworth','/hvac-northridge','/hvac-reseda','/hvac-canoga-park','/hvac-woodland-hills','/hvac-calabasas','/hvac-sherman-oaks','/hvac-studio-city','/hvac-encino','/hvac-tarzana','/hvac-west-hills','/hvac-westchester','/hvac-lennox'
)

$bookingVariants = @(
  '/booking',
  '/booking?service=test',
  '/booking?city=malibu',
  '/booking?service=test&city=malibu'
)

function Check-Url($url) {
  try {
    $resp = Invoke-WebRequest -UseBasicParsing -Uri $url -ErrorAction Stop
    $c = $resp.Content
  } catch {
    Write-Output ("ERROR fetch {0}: {1}" -f $url, $_.Exception.Message)
    return @{ url=$url; ok=$false; reason='fetch-failed' }
  }

  $checks = @{}

  # HTTP 200
  $checks.http200 = ($resp.StatusCode -eq 200)

  # Title checks
  $titleMatches = ([regex]::Matches($c, '<title>(.*?)<\/title>', 'IgnoreCase'))
  $checks.title_count = $titleMatches.Count
  $checks.title_text = if ($titleMatches.Count -ge 1) { $titleMatches[0].Groups[1].Value.Trim() } else { '' }

  # Meta description
  $descMatch = [regex]::Match($c, '<meta\s+name="description"\s+content="([^"]+)"', 'IgnoreCase')
  $checks.description_present = $descMatch.Success
  $checks.description_text = if ($descMatch.Success) { $descMatch.Groups[1].Value.Trim() } else { '' }

  # Robots meta must include both index and follow
  $robotsMatch = [regex]::Match($c, '<meta\s+name="robots"\s+content="([^"]+)"', 'IgnoreCase')
  $checks.robots_present = $robotsMatch.Success
  $robotsVal = if ($robotsMatch.Success) { $robotsMatch.Groups[1].Value.ToLower() } else { '' }
  $checks.robots_index = $robotsVal -match '\bindex\b'
  $checks.robots_follow = $robotsVal -match '\bfollow\b'

  # Canonical
  $canonMatches = ([regex]::Matches($c, '<link[^>]*rel="canonical"[^>]*href="([^"]+)"', 'IgnoreCase'))
  $checks.canonical_count = $canonMatches.Count
  $checks.canonical_text = if ($canonMatches.Count -ge 1) { $canonMatches[0].Groups[1].Value.Trim() } else { '' }

  # H1 count
  $h1Count = ([regex]::Matches($c, '<h1[\s\S]*?>[\s\S]*?<\/h1>', 'IgnoreCase')).Count
  $checks.h1_count = $h1Count

  # Visible breadcrumb presence and simple structure check
  $checks.visibleBreadcrumb = [bool]($c -match 'aria-label="Breadcrumb"|class="server-breadcrumb"')

  # BreadcrumbList JSON-LD occurrences
  $bdMatches = ([regex]::Matches($c, '<script[^>]*type="application/ld\+json"[^>]*>([\s\S]*?)<\/script>', 'IgnoreCase'))
  $bdCount = 0
  $bdJson = ''
  foreach ($m in $bdMatches) {
    if ($m.Groups[1].Value -match '"@type"\s*:\s*"BreadcrumbList"') {
      $bdCount++
      $bdJson = $m.Groups[1].Value
    }
  }
  $checks.breadcrumbJson_count = $bdCount
  $checks.breadcrumbJson = $bdJson

  return @{ url=$url; ok=$true; details=$checks }
}

$results = @()
Write-Output "Checking ${($paths.Count)} city pages..."
foreach ($p in $paths) {
  $u = "$BaseUrl$p"
  $r = Check-Url $u
  $results += $r
  $status = if ($r.ok) { 'PASS' } else { 'FAIL' }
  $missing = ($r.details.GetEnumerator() | Where-Object { -not $_.Value } | ForEach-Object { $_.Key }) -join ', '
  if ($missing -eq '') { $missing = '-' }
  Write-Output "$status`t$u`tMissing: $missing"
}

Write-Output "\nChecking booking variants..."
foreach ($p in $bookingVariants) {
  $u = "$BaseUrl$p"
  $r = Check-Url $u
  $results += $r
  $status = if ($r.ok) { 'PASS' } else { 'FAIL' }
  $missing = ($r.details.GetEnumerator() | Where-Object { -not $_.Value } | ForEach-Object { $_.Key }) -join ', '
  if ($missing -eq '') { $missing = '-' }
  Write-Output "$status`t$u`tMissing: $missing"
}

$total = $results.Count
$passed = ($results | Where-Object { $_.ok }).Count
Write-Output "\nSummary: $passed / $total pages passed checks"

Write-Output "\nVerifying /service-areas contains all city links..."
try {
  $sa = Invoke-WebRequest -UseBasicParsing -Uri "$BaseUrl/service-areas" -ErrorAction Stop
  $saContent = $sa.Content
  $found = @()
  foreach ($p in $paths) {
    $pattern = 'href="' + $p + '"'
    if ($saContent -match [regex]::Escape($pattern)) { $found += $p }
  }
  $missingInServiceAreas = $paths | Where-Object { $found -notcontains $_ }
  if ($missingInServiceAreas.Count -eq 0) { Write-Output "PASS - /service-areas contains all $($paths.Count) city links" } else { Write-Output "FAIL - /service-areas missing: $($missingInServiceAreas -join ', ')" }
} catch {
  Write-Output "ERROR fetching /service-areas: $($_.Exception.Message)"
}

Write-Output "\nVerifying sitemap.xml for all 35 city URLs and duplicates..."
try {
  $sm = Invoke-WebRequest -UseBasicParsing -Uri "$BaseUrl/sitemap.xml" -ErrorAction Stop
  $smContent = $sm.Content
  $locMatches = [regex]::Matches($smContent, '<loc>([^<]+)<\/loc>', 'IgnoreCase') | ForEach-Object { $_.Groups[1].Value.Trim() }
  $cityLocs = $locMatches | Where-Object { $_ -match '^https?:\/\/bernardinomartinhvac\.com\/hvac-' }
  $uniqueCityLocs = $cityLocs | Select-Object -Unique
  $countCityLocs = $cityLocs.Count
  $countUnique = $uniqueCityLocs.Count
  Write-Output "sitemap total hvac-* loc entries: $countCityLocs, unique: $countUnique"
  if ($countUnique -ne $paths.Count) { Write-Output "FAIL - sitemap should contain $($paths.Count) unique city URLs" } else { Write-Output "PASS - sitemap contains $($paths.Count) unique city URLs" }

  # Check duplicates for Studio City and Tarzana
  $studio = $cityLocs | Where-Object { $_ -match 'studio-city' }
  $tarzana = $cityLocs | Where-Object { $_ -match 'tarzana' }
  if ($studio.Count -gt 1) { Write-Output "FAIL - sitemap has duplicate Studio City entries ($($studio.Count))" } else { Write-Output "Studio City entries in sitemap: $($studio.Count)" }
  if ($tarzana.Count -gt 1) { Write-Output "FAIL - sitemap has duplicate Tarzana entries ($($tarzana.Count))" } else { Write-Output "Tarzana entries in sitemap: $($tarzana.Count)" }

} catch {
  Write-Output "ERROR fetching sitemap.xml: $($_.Exception.Message)"
}

if ($passed -ne $total) { exit 2 } else { exit 0 }
