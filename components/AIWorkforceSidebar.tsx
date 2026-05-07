import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    Switch,
} from 'react-native';
import {
    X,
    Bot,
    Users,
    Cpu,
    CircleDollarSign,
    Star as StarIcon,
    Sparkles as SparklesIcon,
    TriangleAlert,
    Activity as ActivityIcon,
    GitBranch,
    Headphones,
    Target,
    Megaphone,
    Settings,
    DollarSign,
    Code,
    UserCheck,
    Scale,
    Database,
    Box,
    Shield,
    FlaskConical,
    Clipboard,
    TrendingUp,
    Building,
    ShieldCheck,
    HeartPulse,
    Factory,
    Truck,
    Landmark,
    Link,
    Brain,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { aiEmployees, aiEmployeeCategories, AIEmployee } from '@/constants/aiEmployees';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { 
  completeAIWorkforce, 
  departments, 
  workforceSummary,
  type MainAgent,
  type SubAgent 
} from '@/constants/completeAIWorkforce_1108';

// All 22 Departments - 1108 Total Agents (from completeAIWorkforce_1108.ts)
const departmentCategories = [
  { id: 'customer-experience', label: 'Customer Experience', color: '#00BCD4', count: 56 },
  { id: 'sales-revenue', label: 'Sales & Revenue', color: '#FFA000', count: 56 },
  { id: 'marketing-growth', label: 'Marketing & Growth', color: '#E91E63', count: 60 },
  { id: 'operations-management', label: 'Operations & Management', color: '#607D8B', count: 52 },
  { id: 'finance-accounting', label: 'Finance & Accounting', color: '#2E7D32', count: 52 },
  { id: 'technology-engineering', label: 'Technology & Engineering', color: '#1565C0', count: 64 },
  { id: 'human-resources', label: 'Human Resources', color: '#9C27B0', count: 44 },
  { id: 'legal-compliance', label: 'Legal & Compliance', color: '#3F51B5', count: 40 },
  { id: 'data-intelligence', label: 'Data & Intelligence', color: '#AF52DE', count: 52 },
  { id: 'product-management', label: 'Product Management', color: '#FF5722', count: 40 },
  { id: 'security-risk', label: 'Security & Risk', color: '#F44336', count: 48 },
  { id: 'research-development', label: 'Research & Development', color: '#009688', count: 36 },
  { id: 'administrative', label: 'Administrative', color: '#795548', count: 36 },
  { id: 'trading-investments', label: 'Trading & Investments', color: '#10B981', count: 72 },
  { id: 'real-estate-property', label: 'Real Estate & Property', color: '#8D6E63', count: 56 },
  { id: 'insurance-risk', label: 'Insurance & Risk', color: '#FF7043', count: 64 },
  { id: 'healthcare-medical', label: 'Healthcare & Medical', color: '#EC407A', count: 56 },
  { id: 'manufacturing-production', label: 'Manufacturing & Production', color: '#5C6BC0', count: 56 },
  { id: 'transportation-logistics', label: 'Transportation & Logistics', color: '#26A69A', count: 56 },
  { id: 'government-public-sector', label: 'Government & Public Sector', color: '#78909C', count: 48 },
  { id: 'supply-chain-logistics', label: 'Supply Chain & Logistics', color: '#42A5F5', count: 40 },
  { id: 'ai-management-governance', label: 'AI Management & Governance', color: '#7C4DFF', count: 24 },
];

interface AIWorkforceSidebarProps {
    isVisible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export const AIWorkforceSidebar: React.FC<AIWorkforceSidebarProps> = ({ isVisible, onClose }) => {
    const { theme } = useTheme();
    const { activeAgents, toggleAgent } = useAIAssistant();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAllDepartments, setShowAllDepartments] = useState(false);
    const [searchQuery] = useState('');
    const [toggleError, setToggleError] = useState<string | null>(null);
    const sidebarAnim = useRef(new Animated.Value(-width)).current;

    // Fetch real-time aggregate stats from tRPC
    const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'all' });

    const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

    useEffect(() => {
        Animated.timing(sidebarAnim, {
            toValue: isVisible ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible, sidebarAnim]);

    if (!isVisible) return null;

    const filteredEmployees = aiEmployees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || 
            emp.type === selectedCategory || 
            emp.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get total agent count from all departments (1108)
    const totalAgentCount = 1108;

    const handleEmployeePress = (employee: AIEmployee) => {
        onClose();
        router.push(employee.route as any);
    };

    const handleToggle = async (employee: AIEmployee, next: boolean) => {
        setToggleError(null);
        toggleAgent(employee.id);
        try {
            await toggleAgentMutation.mutateAsync({
                agentId: employee.id,
                enabled: next,
                agentType: employee.type === 'employee' ? 'main' : 'sub',
            });
        } catch (e) {
            toggleAgent(employee.id);
            const message = e instanceof Error ? e.message : 'Failed to toggle agent';
            setToggleError(message);
        }
    };

    return (
        <View style={styles.overlay}>
            <TouchableOpacity
                style={styles.overlayTouchable}
                activeOpacity={1}
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        styles.sidebar,
                        {
                            backgroundColor: theme.colors.background,
                            transform: [{ translateX: sidebarAnim }],
                        },
                    ]}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.container}>
                        {/* Enhanced Header */}
                        <View style={[styles.header, { borderBottomColor: theme.colors.border, backgroundColor: theme.colors.primary + '10' }]}>
                            <View style={styles.titleRow}>
                                <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                                    <Bot size={20} color="#FFF" />
                                </View>
                                <View>
                                    <Text style={[styles.title, { color: theme.colors.text }]}>AI Workforce</Text>
                                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
                                        {statsData?.activeAgents ?? 0} Active • {statsData?.avgHealthScore ?? 0}% Health
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <X size={24} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>

                        {!!toggleError && (
                            <View style={[styles.errorBanner, { backgroundColor: theme.colors.cardBackground, borderColor: 'rgba(255,59,48,0.25)' }]}>
                                <Text style={[styles.errorBannerText, { color: theme.colors.text }]} numberOfLines={2}>
                                    {toggleError}
                                </Text>
                            </View>
                        )}

                        {/* Mind Map Button */}
                        <TouchableOpacity
                            style={[styles.mindMapButton, { backgroundColor: theme.colors.primary + '15', borderColor: theme.colors.primary + '30' }]}
                            onPress={() => {
                                onClose();
                                router.push('/ai-agent/mind-map' as any);
                            }}
                        >
                            <GitBranch size={16} color={theme.colors.primary} />
                            <Text style={[styles.mindMapButtonText, { color: theme.colors.primary }]}>View Workforce Map</Text>
                        </TouchableOpacity>

                        {/* Infrastructure Stats Bar */}
                        <View style={[styles.statsBar, { backgroundColor: theme.colors.cardBackground }]}>
                            <View style={styles.statItem}>
                                <Users size={14} color={theme.colors.primary} />
                                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                                    {statsData?.totalAgents ?? 0}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Employees</Text>
                            </View>
                            <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
                            <View style={styles.statItem}>
                                <Cpu size={14} color="#00C7BE" />
                                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                                    {statsData?.activeAgents ?? 0}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Agents</Text>
                            </View>
                            <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
                            <View style={styles.statItem}>
                                <CircleDollarSign size={14} color="#34C759" />
                                <Text style={[styles.statValue, { color: '#34C759' }]}>
                                    ${((statsData?.totalTasks ?? 0) * 0.15).toLocaleString()}
                                </Text>
                                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Saved/mo</Text>
                            </View>
                        </View>

                        {/* All 22 Departments - 1108 Agents */}
                        <View style={[styles.departmentSection, { backgroundColor: theme.colors.cardBackground }]}>
                            <TouchableOpacity 
                                style={styles.departmentHeader}
                                onPress={() => setShowAllDepartments(!showAllDepartments)}
                            >
                                <View style={styles.departmentHeaderLeft}>
                                    <Brain size={16} color={theme.colors.primary} />
                                    <Text style={[styles.departmentTitle, { color: theme.colors.text }]}>
                                        22 Departments
                                    </Text>
                                </View>
                                <Text style={[styles.departmentCount, { color: theme.colors.primary }]}>
                                    {totalAgentCount} Agents
                                </Text>
                            </TouchableOpacity>
                            
                            {showAllDepartments && (
                                <View style={styles.departmentGrid}>
                                    {departmentCategories.map((dept) => {
                                        const isSelected = selectedCategory === dept.id;
                                        return (
                                            <TouchableOpacity
                                                key={dept.id}
                                                style={[
                                                    styles.departmentChip,
                                                    { backgroundColor: isSelected ? dept.color + '20' : 'transparent' },
                                                ]}
                                                onPress={() => setSelectedCategory(isSelected ? 'all' : dept.id)}
                                            >
                                                <View style={[styles.departmentDot, { backgroundColor: dept.color }]} />
                                                <Text 
                                                    style={[
                                                        styles.departmentLabel, 
                                                        { color: isSelected ? dept.color : theme.colors.secondaryText }
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    {dept.label}
                                                </Text>
                                                <Text style={[styles.departmentChipCount, { color: theme.colors.secondaryText }]}>
                                                    {dept.count}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            )}
                        </View>

                        {/* Employee/Agent List */}
                        <ScrollView
                            style={styles.employeeList}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContent}
                        >
                            {filteredEmployees.map((employee) => {
                                const EmployeeIcon = employee.icon;
                                const isActive = activeAgents[employee.id];
                                const statusColor = isActive ? '#34C759' : '#8E8E93';

                                return (
                                    <TouchableOpacity
                                        key={employee.id}
                                        style={[styles.employeeCard, { backgroundColor: theme.colors.cardBackground }]}
                                        onPress={() => handleEmployeePress(employee)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.employeeIconWrapper}>
                                            <View style={[styles.employeeIconContainer, { backgroundColor: employee.color + '20' }]}>
                                                <EmployeeIcon size={22} color={employee.color} />
                                            </View>
                                            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                                        </View>

                                        <View style={styles.employeeInfo}>
                                            <View style={styles.employeeNameRow}>
                                                <Text style={[styles.employeeName, { color: theme.colors.text }]} numberOfLines={1}>
                                                    {employee.name}
                                                </Text>
                                                <View style={[
                                                    styles.typeBadge,
                                                    { backgroundColor: employee.type === 'employee' ? '#007AFF20' : '#00C7BE20' }
                                                ]}>
                                                    <Text style={[
                                                        styles.typeBadgeText,
                                                        { color: employee.type === 'employee' ? '#007AFF' : '#00C7BE' }
                                                    ]}>
                                                        {employee.type === 'employee' ? 'EMP' : 'AGT'}
                                                    </Text>
                                                </View>
                                                {employee.isPremium && (
                                                    <View style={[styles.premiumBadge, { backgroundColor: '#FFD70030' }]}>
                                                        <StarIcon size={8} color="#FFD700" />
                                                    </View>
                                                )}
                                                {employee.isNew && (
                                                    <View style={[styles.newBadge, { backgroundColor: '#34C75930' }]}>
                                                        <SparklesIcon size={8} color="#34C759" />
                                                    </View>
                                                )}
                                                {employee.dangerLevel === 'critical' && (
                                                    <View style={[styles.dangerBadge, { backgroundColor: '#FF3B3030' }]}>
                                                        <TriangleAlert size={8} color="#FF3B30" />
                                                    </View>
                                                )}
                                            </View>

                                            <Text style={[styles.employeeTitle, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                                                Replaces: {employee.replacesRole}
                                            </Text>

                                            <View style={styles.costRow}>
                                                <View style={styles.costItem}>
                                                    <Text style={[styles.humanCost, { color: '#FF3B30' }]}>
                                                        {employee.humanCost}
                                                    </Text>
                                                    <Text style={[styles.costArrow, { color: theme.colors.secondaryText }]}> → </Text>
                                                    <Text style={[styles.aiCost, { color: '#34C759' }]}>
                                                        {employee.aiCost}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.healthRow}>
                                                <View style={[styles.healthBarBg, { backgroundColor: theme.colors.border }]}>
                                                    <View style={[
                                                        styles.healthBarFill,
                                                        {
                                                            width: isActive ? `${employee.infrastructure.health}%` : '0%',
                                                            backgroundColor: !isActive ? '#8E8E93' : employee.infrastructure.health > 90 ? '#34C759' : employee.infrastructure.health > 70 ? '#FF9500' : '#FF3B30'
                                                        }
                                                    ]} />
                                                </View>
                                                <Text style={[styles.healthText, { color: theme.colors.secondaryText }]}>
                                                    {isActive ? `${employee.infrastructure.health}%` : 'Offline'}
                                                </Text>
                                            </View>
                                        </View>

                                        <Switch
                                            value={isActive || false}
                                            onValueChange={(next) => handleToggle(employee, next)}
                                            trackColor={{ false: '#767577', true: theme.colors.primary }}
                                            thumbColor={isActive ? '#fff' : '#f4f3f4'}
                                            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], marginLeft: 8 }}
                                        />
                                    </TouchableOpacity>
                                );
                            })}

                            {/* Footer */}
                            <View style={[styles.sidebarFooter, { backgroundColor: theme.colors.primary + '10' }]}>
                                <View style={styles.footerRow}>
                                    <ActivityIcon size={16} color={theme.colors.primary} />
                                    <Text style={[styles.footerText, { color: theme.colors.text }]}>
                                        {(statsData?.tasksToday ?? 0).toLocaleString()} tasks automated today
                                    </Text>
                                </View>
                                <Text style={[styles.footerSubtext, { color: theme.colors.secondaryText }]}>
                                    {statsData?.activeAgents ?? 0} / {aiEmployees.length} Agents Active
                                </Text>
                            </View>
                        </ScrollView>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    overlayTouchable: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: width * 0.88,
        maxWidth: 380,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 11,
        marginTop: 2,
    },
    closeButton: {
        padding: 8,
    },
    errorBanner: {
        marginHorizontal: 12,
        marginTop: 8,
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
    },
    errorBannerText: {
        fontSize: 12,
        fontWeight: '700',
    },
    mindMapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginHorizontal: 12,
        marginTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
    },
    mindMapButtonText: {
        fontSize: 13,
        fontWeight: '700',
    },
    statsBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        marginHorizontal: 12,
        marginTop: 8,
        borderRadius: 12,
    },
    statItem: {
        alignItems: 'center',
        gap: 2,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    statLabel: {
        fontSize: 9,
        textTransform: 'uppercase',
    },
    statDivider: {
        width: 1,
        height: 30,
    },
    departmentSection: {
        marginHorizontal: 12,
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    departmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    departmentHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    departmentTitle: {
        fontSize: 13,
        fontWeight: '700',
    },
    departmentCount: {
        fontSize: 12,
        fontWeight: '600',
    },
    departmentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
        paddingBottom: 8,
        gap: 6,
    },
    departmentChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        minWidth: '45%',
    },
    departmentDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    departmentLabel: {
        fontSize: 11,
        fontWeight: '600',
        flex: 1,
    },
    departmentChipCount: {
        fontSize: 10,
        fontWeight: '700',
    },
    categoryScroll: {
        maxHeight: 48,
    },
    categoryContainer: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 6,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    categoryChipText: {
        fontSize: 11,
        fontWeight: '600',
    },
    employeeList: {
        flex: 1,
        paddingHorizontal: 12,
    },
    listContent: {
        paddingBottom: 30,
    },
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        marginBottom: 8,
    },
    employeeIconWrapper: {
        position: 'relative',
    },
    employeeIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusDot: {
        position: 'absolute',
        bottom: -1,
        right: -1,
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    employeeInfo: {
        flex: 1,
        marginLeft: 12,
    },
    employeeNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 2,
    },
    employeeName: {
        fontSize: 14,
        fontWeight: '700',
        flexShrink: 1,
    },
    typeBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    typeBadgeText: {
        fontSize: 8,
        fontWeight: '800',
    },
    premiumBadge: {
        padding: 2,
        borderRadius: 4,
    },
    newBadge: {
        padding: 2,
        borderRadius: 4,
    },
    dangerBadge: {
        padding: 2,
        borderRadius: 4,
    },
    employeeTitle: {
        fontSize: 11,
        marginBottom: 4,
    },
    costRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    costItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    humanCost: {
        fontSize: 10,
        fontWeight: '600',
        textDecorationLine: 'line-through',
    },
    costArrow: {
        fontSize: 10,
    },
    aiCost: {
        fontSize: 11,
        fontWeight: '700',
    },
    healthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    healthBarBg: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        overflow: 'hidden',
    },
    healthBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    healthText: {
        fontSize: 9,
        fontWeight: '600',
        minWidth: 35,
    },
    sidebarFooter: {
        marginTop: 12,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        gap: 4,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 11,
        fontWeight: '600',
    },
    footerSubtext: {
        fontSize: 10,
    },
});
