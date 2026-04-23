 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Clock, User, Search, Plus } from 'lucide-react-native';

const callHistory = [
  { id: 1, name: 'John Smith', number: '+1 (555) 123-4567', type: 'incoming', duration: '5:23', time: '2 hours ago', missed: false },
  { id: 2, name: 'Sarah Johnson', number: '+1 (555) 987-6543', type: 'outgoing', duration: '12:45', time: '4 hours ago', missed: false },
  { id: 3, name: 'Unknown', number: '+1 (555) 555-0123', type: 'incoming', duration: '0:00', time: '6 hours ago', missed: true },
  { id: 4, name: 'Mike Wilson', number: '+1 (555) 246-8135', type: 'outgoing', duration: '3:17', time: '1 day ago', missed: false },
];

const contacts = [
  { id: 1, name: 'John Smith', number: '+1 (555) 123-4567', favorite: true },
  { id: 2, name: 'Sarah Johnson', number: '+1 (555) 987-6543', favorite: true },
  { id: 3, name: 'Mike Wilson', number: '+1 (555) 246-8135', favorite: false },
  { id: 4, name: 'Emma Davis', number: '+1 (555) 369-2580', favorite: false },
];

export default function VoiceCallScreen() {
  const [activeTab, setActiveTab] = useState<'recent' | 'contacts' | 'keypad'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialNumber, setDialNumber] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.number.includes(searchQuery)
  );

  const keypadNumbers = [
    [{ number: '1', letters: '' }, { number: '2', letters: 'ABC' }, { number: '3', letters: 'DEF' }],
    [{ number: '4', letters: 'GHI' }, { number: '5', letters: 'JKL' }, { number: '6', letters: 'MNO' }],
    [{ number: '7', letters: 'PQRS' }, { number: '8', letters: 'TUV' }, { number: '9', letters: 'WXYZ' }],
    [{ number: '*', letters: '' }, { number: '0', letters: '+' }, { number: '#', letters: '' }],
  ];

  const handleKeypadPress = (value: string) => {
    setDialNumber(prev => prev + value);
  };

  const makeCall = (number: string) => {
    console.log('Making call to:', number);
  };

  const renderCallIcon = (type: string, missed: boolean) => {
    if (missed) {
      return <PhoneIncoming size={20} color="#EF4444" />;
    }
    return type === 'incoming' ? 
      <PhoneIncoming size={20} color="#10B981" /> : 
      <PhoneOutgoing size={20} color="#3B82F6" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Voice Call',
          headerStyle: { backgroundColor: '#3B82F6' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.content}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
            onPress={() => setActiveTab('recent')}
          >
            <Clock size={20} color={activeTab === 'recent' ? '#3B82F6' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
            onPress={() => setActiveTab('contacts')}
          >
            <User size={20} color={activeTab === 'contacts' ? '#3B82F6' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'keypad' && styles.activeTab]}
            onPress={() => setActiveTab('keypad')}
          >
            <Phone size={20} color={activeTab === 'keypad' ? '#3B82F6' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'keypad' && styles.activeTabText]}>Keypad</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Calls */}
        {activeTab === 'recent' && (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Recent Calls</Text>
            {callHistory.map((call) => (
              <View key={call.id} style={styles.callItem}>
                <View style={styles.callIcon}>
                  {renderCallIcon(call.type, call.missed)}
                </View>
                <View style={styles.callInfo}>
                  <Text style={[styles.callName, call.missed && styles.missedCall]}>{call.name}</Text>
                  <Text style={styles.callNumber}>{call.number}</Text>
                  <Text style={styles.callTime}>{call.time}</Text>
                </View>
                <View style={styles.callActions}>
                  <Text style={styles.callDuration}>{call.duration}</Text>
                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => makeCall(call.number)}
                  >
                    <PhoneCall size={20} color="#3B82F6" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Contacts */}
        {activeTab === 'contacts' && (
          <View style={styles.tabContent}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#6B7280" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search contacts..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <ScrollView>
              <Text style={styles.sectionTitle}>Contacts</Text>
              {filteredContacts.map((contact) => (
                <View key={contact.id} style={styles.contactItem}>
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactAvatarText}>{contact.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactNumber}>{contact.number}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.callButton}
                    onPress={() => makeCall(contact.number)}
                  >
                    <PhoneCall size={20} color="#3B82F6" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Keypad */}
        {activeTab === 'keypad' && (
          <View style={styles.tabContent}>
            <View style={styles.dialDisplay}>
              <Text style={styles.dialNumber}>{dialNumber || 'Enter number'}</Text>
            </View>
            
            <View style={styles.keypad}>
              {keypadNumbers.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keypadRow}>
                  {row.map((key) => (
                    <TouchableOpacity
                      key={key.number}
                      style={styles.keypadButton}
                      onPress={() => handleKeypadPress(key.number)}
                    >
                      <Text style={styles.keypadNumber}>{key.number}</Text>
                      {key.letters && <Text style={styles.keypadLetters}>{key.letters}</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.dialActions}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setDialNumber('')}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dialButton}
                onPress={() => makeCall(dialNumber)}
                disabled={!dialNumber}
              >
                <PhoneCall size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addContactButton}>
                <Plus size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  missedCall: {
    color: '#EF4444',
  },
  callNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  callTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  callActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  callDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  dialDisplay: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 32,
  },
  dialNumber: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1F2937',
    letterSpacing: 2,
  },
  keypad: {
    alignItems: 'center',
    marginBottom: 32,
  },
  keypadRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  keypadButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  keypadNumber: {
    fontSize: 28,
    fontWeight: '400',
    color: '#1F2937',
  },
  keypadLetters: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  dialActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  dialButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addContactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});