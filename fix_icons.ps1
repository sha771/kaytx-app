$path = 'C:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\kaytxx-workforce.tsx'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Fix category icons (0-indexed)
$lines[2418] = '      icon: TrendingUp,'       # sales-revenue
$lines[2438] = '      icon: Megaphone,'         # marketing-growth
$lines[2458] = '      icon: Settings,'           # operations-management
$lines[2482] = '      icon: Brain,'              # data-intelligence
$lines[2505] = '      icon: Gauge,'              # analysis-insights-performance
$lines[2526] = '      icon: Calculator,'         # accounting-finance

[System.IO.File]::WriteAllLines($path, $lines, [System.Text.Encoding]::UTF8)
Write-Output "Fixed 6 category icons"
