 
import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Hash,
    MessageSquare,
    Users,
    Search,
    Send,
    Plus,
    MoreVertical,
    Layers,
    Zap
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

type Channel = {
    id: string;
    name: string;
    type: 'public' | 'private' | 'project';
    unreadCount?: number;
    isProject?: boolean;
};

type Message = {
    id: string;
    sender: string;
    avatar: string;
    text: string;
    timestamp: string;
    isMe?: boolean;
};

const CHANNELS: Channel[] = [
    { id: '1', name: 'general', type: 'public' },
    { id: '2', name: 'engineering', type: 'public', unreadCount: 3 },
    { id: '3', name: 'marketing-sync', type: 'public' },
    { id: '4', name: 'Project: Alpha', type: 'project', isProject: true, unreadCount: 12 },
    { id: '5', name: 'executive-only', type: 'private' },
];

const MOCK_MESSAGES: Message[] = [
    { id: 'm1', sender: 'Sarah Connor', avatar: 'https://i.pravatar.cc/150?u=sarah', text: 'Has everyone seen the latest wireframes for the dashboard?', timestamp: '10:45 AM' },
    { id: 'm2', sender: 'John Miller', avatar: 'https://i.pravatar.cc/150?u=john', text: 'Yes, looking great. I think the AI metrics section needs more contrast.', timestamp: '10:47 AM' },
    { id: 'm3', sender: 'Me', avatar: 'https://i.pravatar.cc/150?u=me', text: 'I agree with John. Sarah, can you tweak the HSL values?', timestamp: '10:50 AM', isMe: true },
];

export default function ChatterScreen() {
    const { theme } = useTheme();
    const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Chatter', headerShown: false }} />

            <View style={[styles.sidebar, { borderRightColor: theme.colors.border }]}>
                <View style={styles.sidebarHeader}>
                    <Text style={[styles.workspaceTitle, { color: theme.colors.text }]}>Unifiedze Team</Text>
                    <TouchableOpacity style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}>
                        <Plus size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>CHANNELS</Text>
                    {CHANNELS.filter(c => !c.isProject).map(channel => (
                        <TouchableOpacity
                            key={channel.id}
                            style={[styles.channelItem, activeChannel.id === channel.id && { backgroundColor: theme.colors.cardBackground }]}
                            onPress={() => setActiveChannel(channel)}
                        >
                            <Hash size={18} color={activeChannel.id === channel.id ? theme.colors.primary : theme.colors.secondaryText} />
                            <Text style={[styles.channelName, { color: theme.colors.text }, activeChannel.id === channel.id && { fontWeight: '700' }]}>
                                {channel.name}
                            </Text>
                            {channel.unreadCount && (
                                <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                                    <Text style={styles.badgeText}>{channel.unreadCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText, marginTop: 24 }]}>PROJECTS</Text>
                    {CHANNELS.filter(c => c.isProject).map(channel => (
                        <TouchableOpacity
                            key={channel.id}
                            style={[styles.channelItem, activeChannel.id === channel.id && { backgroundColor: theme.colors.cardBackground }]}
                            onPress={() => setActiveChannel(channel)}
                        >
                            <Layers size={18} color={activeChannel.id === channel.id ? theme.colors.primary : theme.colors.secondaryText} />
                            <Text style={[styles.channelName, { color: theme.colors.text }, activeChannel.id === channel.id && { fontWeight: '700' }]}>
                                {channel.name.replace('Project: ', '')}
                            </Text>
                            {channel.unreadCount && (
                                <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                                    <Text style={styles.badgeText}>{channel.unreadCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.mainContent}>
                <View style={[styles.mainHeader, { borderBottomColor: theme.colors.border }]}>
                    <View>
                        <Text style={[styles.activeChannelTitle, { color: theme.colors.text }]}>
                            {activeChannel.isProject ? <Zap size={18} color={theme.colors.primary} /> : <Hash size={18} color={theme.colors.text} />}
                            {' '}{activeChannel.name}
                        </Text>
                        <View style={styles.headerInfo}>
                            <Users size={12} color={theme.colors.secondaryText} />
                            <Text style={[styles.memberCount, { color: theme.colors.secondaryText }]}> 12 members</Text>
                        </View>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerIconButton}>
                            <Search size={20} color={theme.colors.secondaryText} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconButton}>
                            <MoreVertical size={20} color={theme.colors.secondaryText} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesList}>
                    {MOCK_MESSAGES.map(msg => (
                        <View key={msg.id} style={styles.messageRow}>
                            <Image source={{ uri: msg.avatar }} style={styles.avatar} />
                            <View style={styles.messageContent}>
                                <View style={styles.messageMeta}>
                                    <Text style={[styles.senderName, { color: theme.colors.text }]}>{msg.sender}</Text>
                                    <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>{msg.timestamp}</Text>
                                </View>
                                <Text style={[styles.messageText, { color: theme.colors.text }]}>{msg.text}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={[styles.inputContainer, { borderTopColor: theme.colors.border }]}>
                    <View style={[styles.inputWrapper, { backgroundColor: theme.colors.cardBackground }]}>
                        <TextInput
                            style={[styles.input, { color: theme.colors.text }]}
                            placeholder={`Message #${activeChannel.name}`}
                            placeholderTextColor={theme.colors.secondaryText}
                            multiline
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, { backgroundColor: message.trim() ? theme.colors.primary : theme.colors.border }]}
                            disabled={!message.trim()}
                        >
                            <Send size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        width: 200,
        borderRightWidth: 1,
        paddingTop: 12,
    },
    sidebarHeader: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    workspaceTitle: {
        fontSize: 16,
        fontWeight: '800',
    },
    plusButton: {
        width: 24,
        height: 24,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    channelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 1,
    },
    channelName: {
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
    },
    mainContent: {
        flex: 1,
    },
    mainHeader: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    activeChannelTitle: {
        fontSize: 17,
        fontWeight: '700',
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberCount: {
        fontSize: 12,
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerIconButton: {
        marginLeft: 16,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesList: {
        padding: 16,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 8,
        marginRight: 12,
    },
    messageContent: {
        flex: 1,
    },
    messageMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    senderName: {
        fontWeight: '700',
        fontSize: 14,
        marginRight: 8,
    },
    timestamp: {
        fontSize: 11,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    inputContainer: {
        padding: 16,
        borderTopWidth: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 12,
        padding: 8,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        maxHeight: 120,
        paddingTop: 8,
        paddingBottom: 8,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        marginLeft: 8,
    },
});
