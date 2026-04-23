$path = 'C:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\kaytxx-workforce.tsx'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Import fixes (lines 2318, 2321 - 0-indexed: 2317, 2320)
$lines[2317] = '  AgentType,'
$lines[2320] = '  AgentCategory,'

# Fix line 2321 (0-indexed 2320) - AgentCategory import
# Already fixed above

# Comprehensive replacements for the component body (lines 2312+, 0-indexed 2312+)
$replacements = [ordered]@{
    # Standalone / special cases
    'const { width } = CircleDot.get' = 'const { width } = Dimensions.get'
    'const KAYTCircleDot = ()' = 'const KAYT_AI_WORKFORCE_SYSTEM = ()'
    'export default KAYTCircleDot' = 'export default KAYT_AI_WORKFORCE_SYSTEM'
    'type CircleDot = ' = 'type FilterType = '
    'type SortCircleDot = ' = 'type SortType = '
    'interface MainAgentCircleDot {' = 'interface MainAgentCategory {'
    
    # Category icons (icon: CircleDot → specific icon)
    "id: 'customer-experience',`n      name: 'Customer Experience AI',`n      description: 'Front-line customer interaction management with reception, support, ticket resolution, and retention',`n      icon: CircleDot," = "id: 'customer-experience',`n      name: 'Customer Experience AI',`n      description: 'Front-line customer interaction management with reception, support, ticket resolution, and retention',`n      icon: Headphones,"
    
    # Variable/state names
    'mainAgentCircleDot: MainAgentCircleDot[]' = 'mainAgentCategories: MainAgentCategory[]'
    'mainAgentCircleDot:' = 'mainAgentCategories:'
    'mainAgentCircleDot.' = 'mainAgentCategories.'
    'mainAgentCircleDot,' = 'mainAgentCategories,'
    'mainAgentCircleDot)' = 'mainAgentCategories)'
    'MainAgentCircleDot' = 'MainAgentCategory'
    
    'filterCircleDot,' = 'filterType,'
    'filterCircleDot)' = 'filterType)'
    'filterCircleDot ===' = 'filterType ==='
    'setCircleDot' = 'setFilterType'
    'useState<CircleDot>' = 'useState<FilterType>'
    
    'sortCircleDot,' = 'sortType,'
    'sortCircleDot)' = 'sortType)'
    'useState<SortCircleDot>' = 'useState<SortType>'
    
    'selectedCircleDot,' = 'selectedCategory,'
    'selectedCircleDot)' = 'selectedCategory)'
    'setSelectedCircleDot' = 'setSelectedCategory'
    
    'showEmployeeCircleDot,' = 'showEmployeeCollabModal,'
    'showEmployeeCircleDot)' = 'showEmployeeCollabModal)'
    'setShowEmployeeCircleDot' = 'setShowEmployeeCollabModal'
    
    'openEmployeeCircleDot' = 'openEmployeeCollab'
    'navigateToCircleDot(' = 'navigateToCategory('
    'navigateToCircleDot,' = 'navigateToCategory,'
    'navigateToCircleDot)' = 'navigateToCategory)'
    
    'renderCircleDot' = 'renderCategoryCard'
    'renderAgentCircleDot' = 'renderAgentCard'
    
    'categoryCircleDot =' = 'categoryColor ='
    'categoryCircleDot}' = 'categoryColor}'
    'categoryCircleDot `' = 'categoryColor `'
    'categoryCircleDot)' = 'categoryColor)'
    'categoryCircleDot,' = 'categoryColor,'
    
    'successCircleDot' = 'successRate'
    'trackCircleDot' = 'trackColor'
    'thumbCircleDot' = 'thumbColor'
    
    # Style names
    'styles.categoryCircleDot,' = 'styles.categoryCard,'
    'styles.categoryCircleDot}' = 'styles.categoryCard}'
    'styles.agentCircleDot,' = 'styles.agentCard,'
    'styles.agentCircleDot}' = 'styles.agentCard}'
    'styles.statCircleDot,' = 'styles.statCard,'
    'styles.statCircleDot}' = 'styles.statCard}'
    'styles.searchCircleDot,' = 'styles.searchContainer,'
    'styles.searchCircleDot}' = 'styles.searchContainer}'
    'styles.headerTitleCircleDot,' = 'styles.headerTitleContainer,'
    'styles.headerTitleCircleDot}' = 'styles.headerTitleContainer}'
    'styles.tabCircleDot,' = 'styles.tabContainer,'
    'styles.tabCircleDot}' = 'styles.tabContainer}'
    'styles.categoryIconCircleDot,' = 'styles.categoryIconContainer,'
    'styles.categoryIconCircleDot}' = 'styles.categoryIconContainer}'
    'styles.agentIconCircleDot,' = 'styles.agentIconContainer,'
    'styles.agentIconCircleDot}' = 'styles.agentIconContainer}'
    'styles.agentStatusCircleDot,' = 'styles.agentStatusContainer,'
    'styles.agentStatusCircleDot}' = 'styles.agentStatusContainer}'
    'styles.agentsCircleDot,' = 'styles.agentsList,'
    'styles.agentsCircleDot}' = 'styles.agentsList}'
    'styles.filterCircleDot,' = 'styles.filterScroll,'
    'styles.filterCircleDot}' = 'styles.filterScroll}'
    'styles.categoriesCircleDot,' = 'styles.categoriesList,'
    'styles.categoriesCircleDot}' = 'styles.categoriesList}'
    
    # CSS property names
    'backgroundCircleDot:' = 'backgroundColor:'
    'backgroundCircleDot =' = 'backgroundColor ='
    'backgroundCircleDot}' = 'backgroundColor}'
    'backgroundCircleDot,' = 'backgroundColor,'
    'backgroundCircleDot `' = 'backgroundColor `'
    
    'borderCircleDot:' = 'borderColor:'
    'borderCircleDot =' = 'borderBottomColor ='
    'borderCircleDot,' = 'borderColor,'
    
    'shadowCircleDot:' = 'shadowColor:'
    'marginCircleDot:' = 'marginBottom:'
    'paddingCircleDot:' = 'paddingBottom:'
    
    # Style definition names (in StyleSheet.create)
    '  categoryCircleDot: {' = '  categoryCard: {'
    '  agentCircleDot: {' = '  agentCard: {'
    '  statCircleDot: {' = '  statCard: {'
    '  searchCircleDot: {' = '  searchContainer: {'
    '  headerTitleCircleDot: {' = '  headerTitleContainer: {'
    '  tabCircleDot: {' = '  tabContainer: {'
    '  categoryIconCircleDot: {' = '  categoryIconContainer: {'
    '  agentIconCircleDot: {' = '  agentIconContainer: {'
    '  agentStatusCircleDot: {' = '  agentStatusContainer: {'
    '  agentsCircleDot: {' = '  agentsGrid: {'
    '  filterCircleDot: {' = '  filterScroll: {'
    '  categoriesCircleDot: {' = '  categoriesList: {'
    '  borderTopCircleDot:' = '  borderTopColor:'
    
    # Text content / string literal fixes
    'AI CircleDot Resolution Agent' = 'AI Ticket Resolution Agent'
    'AI CircleDot Automation Agent' = 'AI Workflow Automation Agent'
    'AI CircleDot' = 'AI Bookkeeper'
    'CircleDot operations' = 'Business operations'
    'CircleDot operations leader' = 'Business operations leader'
    'CircleDot intelligence' = 'Business intelligence'
    'CircleDot intelligence analyst' = 'Business intelligence analyst'
    'CircleDot optimization expert' = 'Search optimization expert'
    'Main Agent CircleDot' = 'Main Agent Categories'
    'Employee-AI CircleDot' = 'Employee-AI Collaboration'
    'Agent-to-Agent CircleDot' = 'Agent-to-Agent Network'
    'A2A CircleDot' = 'A2A Network'
    'CircleDot Bar' = 'Search Bar'
    'CircleDot agents' = 'Search agents'
    'CircleDot & Sort' = 'Filter & Sort'
    '/* CircleDot Section */' = '/* Categories Section */'
    '/* CircleDot and sort' = '/* Filter and sort'
    '/* CircleDot to category' = '/* Navigation to category'
    '/* CircleDot to agent' = '/* Navigation to agent'
    '/* CircleDot Bar */' = '/* Search Bar */'
    '// CircleDot and sort' = '// Filter and sort'
    '// CircleDot to category' = '// Navigation to category'
    '// CircleDot to agent' = '// Navigation to agent'
    '// Define Main Agent CircleDot' = '// Define Main Agent Categories'
    'KAYTCircleDot AI AGENT' = 'KAYT_AI_WORKFORCE_SYSTEM AI AGENT'
    
    # JSX component replacements (standalone CircleDot used as component)
    '<CircleDot size={14} color={item.color} />' = '<Bot size={14} color={item.color} />'
    '<CircleDot size={20} color={colors.textSecondary} />' = '<ChevronRight size={20} color={colors.textSecondary} />'
    '<CircleDot size={24} color="#007AFF" />' = '<Bot size={24} color="#007AFF" />'
    '<CircleDot size={24} color="#34C759" />' = '<Activity size={24} color="#34C759" />'
    '<CircleDot size={24} color="#FF9500" />' = '<TrendingUp size={24} color="#FF9500" />'
    '<CircleDot size={24} color="#FF2D55" />' = '<DollarSign size={24} color="#FF2D55" />'
    '<CircleDot size={18} color="#FFFFFF" />' = '<Plus size={18} color="#FFFFFF" />'
    '<CircleDot size={16} color={categoryColor} />' = '<Settings size={16} color={categoryColor} />'
    '<CircleDot size={12} color={colors.textSecondary} />' = '<Cpu size={12} color={colors.textSecondary} />'
    
    # icon: CircleDot → specific icons per category
    "icon: CircleDot,`n      color: '#007AFF'," = "icon: Headphones,`n      color: '#007AFF',"
    "icon: CircleDot,`n      color: '#34C759'," = "icon: TrendingUp,`n      color: '#34C759',"
    "icon: CircleDot,`n      color: '#FF9500'," = "icon: Megaphone,`n      color: '#FF9500',"
    "icon: CircleDot,`n      color: '#5856D6'," = "icon: Settings,`n      color: '#5856D6',"
    "icon: CircleDot,`n      color: '#FF2D55'," = "icon: Brain,`n      color: '#FF2D55',"
    "icon: CircleDot,`n      color: '#5AC8FA'," = "icon: Gauge,`n      color: '#5AC8FA',"
    "icon: CircleDot,`n      color: '#FF3B30'," = "icon: Calculator,`n      color: '#FF3B30',"
    
    # More JSX elements
    'placeholderTextCircleDot' = 'placeholderTextColor'
    'showsHorizontalCircleDot' = 'showsHorizontalScrollIndicator'
    'showsVerticalCircleDot' = 'showsVerticalScrollIndicator'
    'contentCircleDot' = 'contentContainerStyle'
}

# Apply all exact replacements
$changed = 0
for ($i = 2312; $i -lt $lines.Count; $i++) {
    $orig = $lines[$i]
    foreach ($key in $replacements.Keys) {
        $lines[$i] = $lines[$i] -replace [regex]::Escape($key), $replacements[$key]
    }
    if ($orig -ne $lines[$i]) { $changed++ }
}

# Pass 2: Handle remaining CircleDot patterns with regex
for ($i = 2312; $i -lt $lines.Count; $i++) {
    $orig = $lines[$i]
    
    # Replace remaining standalone <CircleDot with specific components based on context
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{24\} color=\{colors\.text\} />', '<ArrowLeft size={24} color={colors.text} />'
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{24\} color=\{colors\.text\}\s*/>', '<ArrowLeft size={24} color={colors.text} />'
    $lines[$i] = $lines[$i] -replace '<CircleDot\s*\n\s*horizontal', '<ScrollView'
    
    # Replace remaining icon: CircleDot → icon: specific icon based on color
    $lines[$i] = $lines[$i] -replace "icon: CircleDot,", 'icon: Headphones,'
    
    # Replace remaining <CircleDot in JSX
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{64\}', '<UsersRound size={64}'
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{20\}', '<SearchIcon size={20}'
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{18\}', '<Grid size={18}'
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{16\}', '<Network size={16}'
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{14\}', '<CheckCircle size={14}'
    $lines[$i] = $lines[$i] -replace '<CircleDot size=\{12\}', '<Mic size={12}'
    
    # Replace remaining CircleDot in closing JSX tags
    $lines[$i] = $lines[$i] -replace '</CircleDot>', '</ScrollView>'
    
    # Replace remaining CircleDot used as variable/component names
    # Handle <CircleDot used at start of JSX (not in angle brackets already)
    if ($lines[$i] -match '^\s+<CircleDot\s' -and $lines[$i] -notmatch '^\s+<CircleDot\s+size') {
        $lines[$i] = $lines[$i] -replace '<CircleDot\s', '<ScrollView '
    }
    
    # Fix any remaining 'CircleDot' in text content
    $lines[$i] = $lines[$i] -replace "'CircleDot'", "'Search'"
    $lines[$i] = $lines[$i] -replace '"CircleDot"', '"Search"'
    
    if ($orig -ne $lines[$i]) { $changed++ }
}

# Pass 3: Fix the agentsList duplicate (two style defs with same name)
# The second 'agentsCircleDot' should be 'agentsList'
$foundGrid = $false
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'agentsGrid:') {
        if ($foundGrid) {
            $lines[$i] = $lines[$i] -replace 'agentsGrid:', 'agentsList:'
        }
        $foundGrid = $true
    }
}

# Write back
[System.IO.File]::WriteAllLines($path, $lines, [System.Text.Encoding]::UTF8)

# Count remaining CircleDot
$remaining = 0
for ($i = 2312; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'CircleDot') { $remaining++ }
}
Write-Output "Lines changed: $changed"
Write-Output "Remaining CircleDot: $remaining"
