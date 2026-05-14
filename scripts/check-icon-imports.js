#!/usr/bin/env node
/**
 * Script to check for missing icon imports in TypeScript/React files
 * Usage: node check-icon-imports.js [file-or-directory]
 */

const fs = require('fs');
const path = require('path');

// Common lucide icons that might be used
const COMMON_ICONS = [
  'Activity', 'Airplay', 'AlarmClock', 'AlignCenter', 'AlignJustify', 'AlignLeft', 'AlignRight',
  'Anchor', 'Aperture', 'Archive', 'ArrowDown', 'ArrowDownCircle', 'ArrowDownLeft', 'ArrowDownRight',
  'ArrowLeft', 'ArrowLeftCircle', 'ArrowRight', 'ArrowRightCircle', 'ArrowUp', 'ArrowUpCircle',
  'ArrowUpLeft', 'ArrowUpRight', 'AtSign', 'Award', 'BarChart', 'BarChart2', 'BarChart3', 'BarChart4',
  'Battery', 'BatteryCharging', 'BatteryFull', 'BatteryLow', 'BatteryMedium', 'Beaker', 'Bell',
  'BellMinus', 'BellOff', 'BellPlus', 'BellRing', 'Bike', 'Binary', 'Bird', 'Bold', 'Book',
  'BookOpen', 'Bookmark', 'BookmarkMinus', 'BookmarkPlus', 'Bot', 'Box', 'BoxSelect', 'Briefcase',
  'Brush', 'Bug', 'Building', 'Building2', 'Bus', 'Calculator', 'Calendar', 'Camera', 'CameraOff',
  'Car', 'Carrot', 'Cast', 'Check', 'CheckCircle', 'CheckCircle2', 'CheckSquare', 'ChevronDown',
  'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronsDown', 'ChevronsLeft', 'ChevronsRight',
  'ChevronsUp', 'Chrome', 'Circle', 'CircleDot', 'CircleSlash', 'Clipboard', 'ClipboardCheck',
  'ClipboardCopy', 'ClipboardList', 'Clock', 'Cloud', 'CloudDrizzle', 'CloudFog', 'CloudHail',
  'CloudLightning', 'CloudMoon', 'CloudOff', 'CloudRain', 'CloudRainWind', 'CloudSnow', 'CloudSun',
  'Cloudy', 'Clover', 'Code', 'Codepen', 'Codesandbox', 'Coffee', 'Coins', 'Columns', 'Command',
  'Compass', 'Contact', 'Contrast', 'Cookie', 'Copy', 'Copyleft', 'Copyright', 'CornerDownLeft',
  'CornerDownRight', 'CornerLeftDown', 'CornerLeftUp', 'CornerRightDown', 'CornerRightUp',
  'CornerUpLeft', 'CornerUpRight', 'Cpu', 'CreditCard', 'Croissant', 'Crop', 'Cross', 'Crosshair',
  'Crown', 'Currency', 'Database', 'Delete', 'Diamond', 'Dice1', 'Dice2', 'Dice3', 'Dice4', 'Dice5',
  'Dice6', 'Disc', 'Divide', 'DivideCircle', 'DivideSquare', 'DollarSign', 'Download', 'DownloadCloud',
  'Dribbble', 'Droplet', 'Droplets', 'Drumstick', 'Edit', 'Edit2', 'Edit3', 'Egg', 'EggFried',
  'Equal', 'EqualNot', 'Eraser', 'Euro', 'Expand', 'ExternalLink', 'Eye', 'EyeOff', 'Facebook',
  'Factory', 'FastForward', 'Feather', 'Figma', 'File', 'FileCheck', 'FileCheck2', 'FileCode',
  'FileDigit', 'FileInput', 'FileMinus', 'FileMinus2', 'FileOutput', 'FilePlus', 'FilePlus2',
  'FileSearch', 'FileSignature', 'FileText', 'FileX', 'FileX2', 'Files', 'Film', 'Filter',
  'Fingerprint', 'Flag', 'FlagOff', 'FlagTriangleLeft', 'FlagTriangleRight', 'Flame', 'Flashlight',
  'FlashlightOff', 'FlaskConical', 'FlaskRound', 'Flower', 'Flower2', 'Focus', 'Folder', 'FolderMinus',
  'FolderOpen', 'FolderPlus', 'FormInput', 'Forward', 'Frame', 'Framer', 'Frown', 'FunctionSquare',
  'Gamepad', 'Gamepad2', 'Gauge', 'Gavel', 'Gem', 'Ghost', 'Gift', 'GitBranch', 'GitBranchPlus',
  'GitCommit', 'GitCompare', 'GitFork', 'GitMerge', 'GitPullRequest', 'Github', 'Gitlab', 'Glasses',
  'Globe', 'Globe2', 'Grab', 'GraduationCap', 'Grape', 'Grid', 'GripHorizontal', 'GripVertical',
  'Hammer', 'Hand', 'HandMetal', 'HardDrive', 'HardHat', 'Hash', 'Haze', 'Headphones', 'Heart',
  'HeartCrack', 'HeartHandshake', 'HeartOff', 'HeartPulse', 'HelpCircle', 'Hexagon', 'Highlighter',
  'History', 'Home', 'Hourglass', 'IceCream', 'Image', 'ImageMinus', 'ImageOff', 'ImagePlus',
  'Import', 'Inbox', 'Indent', 'IndianRupee', 'Infinity', 'Info', 'Inspect', 'Instagram', 'Italic',
  'JapaneseYen', 'Key', 'Keyboard', 'Lamp', 'LampCeiling', 'LampDesk', 'LampFloor', 'LampWallDown',
  'LampWallUp', 'Landmark', 'Languages', 'Laptop', 'Laptop2', 'Lasso', 'LassoSelect', 'Laugh',
  'Layers', 'Layout', 'LayoutDashboard', 'LayoutGrid', 'LayoutList', 'LayoutTemplate', 'Library',
  'LifeBuoy', 'Lightbulb', 'LightbulbOff', 'LineChart', 'Link', 'Link2', 'Link2Off', 'Linkedin',
  'List', 'ListChecks', 'ListEnd', 'ListMinus', 'ListMusic', 'ListOrdered', 'ListPlus', 'ListStart',
  'ListVideo', 'ListX', 'Loader', 'Loader2', 'Locate', 'LocateFixed', 'LocateOff', 'Lock', 'LogIn',
  'LogOut', 'Mail', 'Map', 'MapPin', 'MapPinOff', 'Maximize', 'Maximize2', 'Medal', 'Megaphone',
  'Meh', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Mic2', 'MicOff', 'Microscope', 'Microwave',
  'Minimize', 'Minimize2', 'Minus', 'MinusCircle', 'MinusSquare', 'Monitor', 'MonitorOff',
  'MonitorSpeaker', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Mountain', 'MountainSnow', 'Mouse',
  'MousePointer', 'MousePointer2', 'MousePointerClick', 'Move', 'Move3d', 'MoveDiagonal',
  'MoveDiagonal2', 'MoveHorizontal', 'MoveVertical', 'Music', 'Navigation', 'Navigation2', 'Network',
  'Newspaper', 'Nut', 'Octagon', 'Option', 'Outdent', 'Package', 'PackageCheck', 'PackageMinus',
  'PackageOpen', 'PackagePlus', 'PackageSearch', 'PackageX', 'Paintbrush', 'Paintbrush2', 'Palette',
  'Palmtree', 'Paperclip', 'PartyPopper', 'Pause', 'PauseCircle', 'PauseOctagon', 'PenTool',
  'Pencil', 'Percent', 'PersonStanding', 'Phone', 'PhoneCall', 'PhoneForwarded', 'PhoneIncoming',
  'PhoneMissed', 'PhoneOff', 'PhoneOutgoing', 'PieChart', 'PiggyBank', 'Pin', 'Pipette', 'Plane',
  'Play', 'PlayCircle', 'Plug', 'PlugZap', 'Plus', 'PlusCircle', 'PlusSquare', 'Pocket', 'Podcast',
  'Pointer', 'PoundSterling', 'Power', 'PowerOff', 'Printer', 'QrCode', 'Quote', 'Radio', 'RadioReceiver',
  'RectangleHorizontal', 'RectangleVertical', 'Recycle', 'Redo', 'Redo2', 'RefreshCcw', 'RefreshCw',
  'Regex', 'Repeat', 'Repeat1', 'Reply', 'ReplyAll', 'Rewind', 'Rocket', 'RockingChair', 'Rotate3d',
  'RotateCcw', 'RotateCw', 'Rss', 'Ruler', 'RussianRuble', 'Scale', 'Scan', 'ScanFace', 'ScanLine',
  'Scissors', 'ScreenShare', 'ScreenShareOff', 'Scroll', 'Search', 'SearchCheck', 'SearchSlash',
  'Send', 'SeparatorHorizontal', 'SeparatorVertical', 'Server', 'ServerCog', 'ServerCrash', 'ServerOff',
  'Settings', 'Settings2', 'Share', 'Share2', 'Sheet', 'Shield', 'ShieldAlert', 'ShieldCheck',
  'ShieldClose', 'ShieldOff', 'Shirt', 'ShoppingBag', 'ShoppingCart', 'Shovel', 'ShowerHead',
  'Shrink', 'Shuffle', 'Sidebar', 'SidebarClose', 'SidebarOpen', 'Sigma', 'Signal', 'SignalHigh',
  'SignalLow', 'SignalMedium', 'SignalZero', 'SkipBack', 'SkipForward', 'Skull', 'Slack',
  'Slice', 'Sliders', 'SlidersHorizontal', 'Smartphone', 'Smile', 'Snowflake', 'SortAsc', 'SortDesc',
  'Speaker', 'Sprout', 'Square', 'Star', 'StarHalf', 'StarOff', 'StepBack', 'StepForward', 'Stethoscope',
  'Sticker', 'StickyNote', 'StopCircle', 'StretchHorizontal', 'StretchVertical', 'Strikethrough',
  'Subscript', 'Subtitles', 'Sun', 'SunDim', 'SunMedium', 'SunMoon', 'Sunrise', 'Sunset', 'Superscript',
  'SwissFranc', 'SwitchCamera', 'Sword', 'Swords', 'Syringe', 'Table', 'Table2', 'Tablet', 'Tag',
  'Tags', 'Target', 'Tent', 'Terminal', 'TerminalSquare', 'TestTube', 'TestTube2', 'Thermometer',
  'ThermometerSnowflake', 'ThermometerSun', 'ThumbsDown', 'ThumbsUp', 'Ticket', 'Timer', 'TimerOff',
  'ToggleLeft', 'ToggleRight', 'Tornado', 'ToyBrick', 'Train', 'Trash', 'Trash2', 'TreeDeciduous',
  'TreePine', 'Trees', 'Trello', 'TrendingDown', 'TrendingUp', 'Triangle', 'Trophy', 'Truck', 'Tv',
  'Tv2', 'Twitch', 'Twitter', 'Type', 'Umbrella', 'Underline', 'Undo', 'Undo2', 'Unlink', 'Unlink2',
  'Unlock', 'Upload', 'UploadCloud', 'Usb', 'User', 'UserCheck', 'UserCog', 'UserMinus', 'UserPlus',
  'UserX', 'Users', 'Utensils', 'UtensilsCrossed', 'Vegan', 'VenetianMask', 'Verified', 'Vibrate',
  'VibrateOff', 'Video', 'VideoOff', 'View', 'Voicemail', 'Volume', 'Volume1', 'Volume2', 'VolumeX',
  'Wallet', 'Wand', 'Wand2', 'Watch', 'Waves', 'Webcam', 'Wifi', 'WifiOff', 'Wind', 'WrapText',
  'Wrench', 'X', 'XCircle', 'XOctagon', 'XSquare', 'Youtube', 'Zap', 'ZapOff', 'ZoomIn', 'ZoomOut',
  // Additional icons from react-native
  'AlertTriangle', 'ServerIcon', 'Cpu', 'Cog', 'Navigation', 'Home', 'ClipboardList', 'FileCheck',
  'FileSignature', 'CheckSquare', 'Factory', 'GraduationCap', 'ShieldCheck', 'Landmark', 'HardDrive',
  'Package', 'ShieldAlert', 'AlertTriangle', 'Lock', 'Fingerprint', 'Crown', 'Smile', 'Heart', 'Trophy',
  'Palette', 'Truck', 'ServerIcon', 'DollarSign', 'Building2', 'Briefcase', 'Microscope', 'MapPin'
];

function extractUsedIcons(content) {
  const usedIcons = new Set();
  
  // Match patterns like: icon: IconName, or <IconName />, or { icon: IconName }
  const patterns = [
    /icon:\s*([A-Z][a-zA-Z0-9]*)/g,
    /<([A-Z][a-zA-Z0-9]+)\s*\/?>/g,
    /icon:\s*{?\s*([A-Z][a-zA-Z0-9]+)\s*}?/g,
    /{\s*([A-Z][a-zA-Z0-9]+)\s*}/g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const iconName = match[1];
      if (COMMON_ICONS.includes(iconName)) {
        usedIcons.add(iconName);
      }
    }
  }
  
  return usedIcons;
}

function extractImportedIcons(content) {
  const importedIcons = new Set();
  
  // Match lucide-react-native imports
  const lucideImportPattern = /from\s+['"]lucide-react-native['"]/g;
  const importBlockPattern = /import\s*{([^}]+)}\s*from\s*['"]lucide-react-native['"]/g;
  
  let match;
  while ((match = importBlockPattern.exec(content)) !== null) {
    const importList = match[1];
    // Extract individual icons from the import list
    const iconPattern = /([A-Z][a-zA-Z0-9]*)/g;
    let iconMatch;
    while ((iconMatch = iconPattern.exec(importList)) !== null) {
      importedIcons.add(iconMatch[1]);
    }
  }
  
  return importedIcons;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const usedIcons = extractUsedIcons(content);
  const importedIcons = extractImportedIcons(content);
  
  const missingIcons = [];
  for (const icon of usedIcons) {
    if (!importedIcons.has(icon)) {
      missingIcons.push(icon);
    }
  }
  
  return { usedIcons, importedIcons, missingIcons };
}

function findTsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.includes('node_modules')) {
      findTsxFiles(fullPath, files);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function main() {
  const targetPath = process.argv[2] || 'app';
  const fullPath = path.resolve(targetPath);
  
  let files;
  if (fs.statSync(fullPath).isDirectory()) {
    files = findTsxFiles(fullPath);
  } else {
    files = [fullPath];
  }
  
  let hasErrors = false;
  
  for (const file of files) {
    const result = checkFile(file);
    
    if (result.missingIcons.length > 0) {
      hasErrors = true;
      console.log(`\n❌ ${file}`);
      console.log(`   Missing imports: ${result.missingIcons.join(', ')}`);
    }
  }
  
  if (!hasErrors) {
    console.log('✅ All files have correct icon imports!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Found files with missing icon imports');
    process.exit(1);
  }
}

main();
