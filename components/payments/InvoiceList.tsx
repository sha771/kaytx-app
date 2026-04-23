import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { trpc } from '@/lib/trpc';
import { Invoice } from '../../types/payment';
import { Receipt, Visibility, Download, Payment } from 'lucide-react-native';

interface InvoiceListProps {
  organizationId: string;
  onInvoicePress?: (invoice: Invoice) => void;
  onPaymentPress?: (invoice: Invoice) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({
  organizationId,
  onInvoicePress,
  onPaymentPress,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getInvoices = trpc.billing.getInvoices.useQuery(
    { 
      organizationId,
      status: statusFilter === 'all' ? undefined : statusFilter as any,
    },
    {
      enabled: !!organizationId,
    }
  );

  useEffect(() => {
    if (getInvoices.data?.success && getInvoices.data.data) {
      setInvoices(getInvoices.data.data.items);
    }
    setLoading(false);
  }, [getInvoices.data]);

  const handleRefresh = () => {
    setRefreshing(true);
    getInvoices.refetch().finally(() => {
      setRefreshing(false);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'overdue':
        return '#F44336';
      case 'cancelled':
        return '#9E9E9E';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(parseFloat(amount));
  };

  const handleInvoicePress = (invoice: Invoice) => {
    onInvoicePress?.(invoice);
  };

  const handlePaymentPress = (invoice: Invoice) => {
    if (invoice.status === 'paid') {
      Alert.alert('Info', 'This invoice has already been paid.');
      return;
    }
    onPaymentPress?.(invoice);
  };

  const downloadInvoice = async (invoice: Invoice) => {
    try {
      // In a real implementation, you would download the PDF
      Alert.alert('Download', `Downloading invoice ${invoice.invoiceNumber}...`);
    } catch {
      Alert.alert('Error', 'Failed to download invoice');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading invoices...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Invoices</Text>
        <View style={styles.filters}>
          {['all', 'pending', 'paid', 'overdue'].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setStatusFilter(status)}
              style={[
                styles.filterChip,
                statusFilter === status && styles.filterChipActive
              ]}
            >
              <Text style={[
                styles.filterChipText,
                statusFilter === status && styles.filterChipTextActive
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {invoices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Receipt size={64} color="#ccc" />
          <Text style={styles.emptyText}>No invoices found</Text>
          <Text style={styles.emptySubtext}>
            {statusFilter === 'all' 
              ? "You haven't received any invoices yet"
              : `No ${statusFilter} invoices found`
            }
          </Text>
        </View>
      ) : (
        <View style={styles.invoiceList}>
          {invoices.map((invoice) => (
            <View key={invoice.id} style={styles.invoiceCard}>
              <View style={styles.invoiceHeader}>
                <View style={styles.invoiceInfo}>
                  <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
                  <Text style={styles.invoiceDate}>
                    {formatDate(invoice.createdAt)}
                  </Text>
                </View>
                <View style={[styles.statusChip, { backgroundColor: getStatusColor(invoice.status) }]}>
                  <Text style={styles.statusChipText}>{getStatusText(invoice.status)}</Text>
                </View>
              </View>

              <View style={styles.invoiceDetails}>
                <Text style={styles.invoiceAmount}>
                  {formatCurrency(invoice.total, invoice.currency)}
                </Text>
                {invoice.dueDate && invoice.status !== 'paid' && (
                  <Text style={styles.dueDate}>
                    Due: {formatDate(invoice.dueDate)}
                  </Text>
                )}
              </View>

              {invoice.items && invoice.items.length > 0 && (
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>Items:</Text>
                  {invoice.items.slice(0, 3).map((item, index) => (
                    <Text key={index} style={styles.itemText}>
                      • {item.description} - {formatCurrency(item.total.toString(), invoice.currency)}
                    </Text>
                  ))}
                  {invoice.items.length > 3 && (
                    <Text style={styles.moreItemsText}>
                      +{invoice.items.length - 3} more items
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleInvoicePress(invoice)}
                >
                  <Visibility size={20} color="#007AFF" />
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => downloadInvoice(invoice)}
                >
                  <Download size={20} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>

                {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.payButton]}
                    onPress={() => handlePaymentPress(invoice)}
                  >
                    <Payment size={20} color="#fff" />
                    <Text style={[styles.actionButtonText, styles.payButtonText]}>
                      Pay Now
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  invoiceList: {
    padding: 16,
  },
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusChip: {
    height: 28,
  },
  invoiceDetails: {
    marginBottom: 12,
  },
  invoiceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dueDate: {
    fontSize: 14,
    color: '#F44336',
    marginTop: 4,
  },
  itemsContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  moreItemsText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: '#007AFF',
  },
  payButtonText: {
    color: '#fff',
  },
});

export default InvoiceList;
