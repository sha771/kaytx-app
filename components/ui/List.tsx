/**
 * List Component
 * Consistent list styling across the app
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ViewStyle,
  TextStyle,
  RefreshControl,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface ListProps {
  data: any[];
  renderItem: ListRenderItem<any>;
  keyExtractor: (item: any, index: number) => string;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  onLongPress,
  disabled = false,
  style,
}) => {
  const theme = useTheme();

  const getContainerStyle = (): ViewStyle => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: disabled 
        ? (theme.colors?.backgroundDisabled || '#F2F2F7')
        : (theme.colors?.background || '#fff'),
      opacity: disabled ? 0.6 : 1,
      ...style,
    };
  };

  const getTextContainerStyle = (): ViewStyle => {
    return {
      flex: 1,
      marginLeft: leftIcon ? 12 : 0,
      marginRight: rightIcon ? 12 : 0,
    };
  };

  const getTitleStyle = (): TextStyle => {
    return {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors?.text || '#000',
    };
  };

  const getSubtitleStyle = (): TextStyle => {
    return {
      fontSize: 14,
      color: theme.colors?.textSecondary || '#666',
      marginTop: 2,
    };
  };

  return (
    <View style={getContainerStyle()}>
      {leftIcon && <View>{leftIcon}</View>}
      
      <View style={getTextContainerStyle()}>
        <Text style={getTitleStyle()}>{title}</Text>
        {subtitle && <Text style={getSubtitleStyle()}>{subtitle}</Text>}
      </View>
      
      {rightIcon && <View>{rightIcon}</View>}
    </View>
  );
};

export const List: React.FC<ListProps> = ({
  data,
  renderItem,
  keyExtractor,
  refreshing = false,
  onRefresh,
  onEndReached,
  onEndReachedThreshold = 0.5,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  style,
  contentContainerStyle,
}) => {
  const theme = useTheme();

  const getContainerStyle = (): ViewStyle => {
    return {
      flex: 1,
      backgroundColor: theme.colors?.background || '#fff',
      ...style,
    };
  };

  const getItemSeparator = () => (
    <View style={{
      height: 1,
      backgroundColor: theme.colors?.border || '#C6C6C8',
      marginLeft: 16,
    }} />
  );

  return (
    <FlatList
      style={getContainerStyle()}
      contentContainerStyle={contentContainerStyle}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={getItemSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent || (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: theme.colors?.textSecondary || '#666', fontSize: 16 }}>
            No items found
          </Text>
        </View>
      )}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors?.primary || '#007AFF'}
          />
        ) : undefined
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      showsVerticalScrollIndicator={false}
    />
  );
};

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();

  return (
    <View style={{
      backgroundColor: theme.colors?.backgroundSecondary || '#F2F2F7',
      paddingVertical: 8,
      paddingHorizontal: 16,
    }}>
      <Text style={{
        fontSize: 13,
        fontWeight: '600',
        color: theme.colors?.textSecondary || '#666',
        textTransform: 'uppercase',
      }}>
        {title}
      </Text>
    </View>
  );
};
