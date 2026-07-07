import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BlurView } from 'expo-blur';
import { Code, Copy, Check, Eye, Code2, FileCode, Terminal } from 'lucide-react-native';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
  path: string;
}

interface CodeViewerProps {
  files?: CodeFile[];
  readOnly?: boolean;
}

export default function CodeViewer({ files = [], readOnly = true }: CodeViewerProps) {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(files[0] || null);
  const [copied, setCopied] = useState(false);

  const defaultFiles: CodeFile[] = [
    {
      id: '1',
      name: 'deployment.yaml',
      language: 'yaml',
      path: '/k8s/production',
      content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
      - name: api-gateway
        image: registry.kaytx.com/api-gateway:v2.4.1
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10`
    },
    {
      id: '2',
      name: 'Dockerfile',
      language: 'dockerfile',
      path: '/api-gateway',
      content: `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]`
    },
    {
      id: '3',
      name: 'terraform/main.tf',
      language: 'hcl',
      path: '/infrastructure',
      content: `resource "aws_eks_cluster" "main" {
  name     = "kaytx-production"
  role_arn = aws_iam_role.eks_cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.eks.id]
  }

  depends_on = [aws_iam_role_policy_attachment.eks_cluster]
}

resource "aws_autoscaling_group" "eks_nodes" {
  desired_capacity = 3
  max_size         = 6
  min_size         = 2

  tag {
    key                 = "kubernetes.io/cluster/kaytx-production"
    value               = "owned"
    propagate_at_launch = true
  }
}`
    }
  ];

  const displayFiles = files.length > 0 ? files : defaultFiles;

  const getLanguageIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'yaml':
      case 'yml':
        return FileCode;
      case 'dockerfile':
        return Terminal;
      case 'hcl':
        return Code2;
      default:
        return Code;
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'yaml':
      case 'yml':
        return '#F59E0B';
      case 'dockerfile':
        return '#3B82F6';
      case 'hcl':
        return '#8B5CF6';
      case 'typescript':
      case 'javascript':
        return '#F59E0B';
      case 'python':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const handleCopy = () => {
    if (selectedFile) {
      // In a real app, you would use Clipboard.setString()
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={[styles.container, { backgroundColor: theme.colors.card + '90' }]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <Code size={24} color="#3B82F6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Code Viewer
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Infrastructure as Code
            </Text>
          </View>
        </View>
        {selectedFile && (
          <TouchableOpacity 
            style={[styles.copyButton, { backgroundColor: '#3B82F6' + '20' }]}
            onPress={handleCopy}
          >
            {copied ? (
              <Check size={16} color="#3B82F6" />
            ) : (
              <Copy size={16} color="#3B82F6" />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filesRow}>
            {displayFiles.map((file) => {
              const LanguageIcon = getLanguageIcon(file.language);
              const languageColor = getLanguageColor(file.language);
              const isSelected = selectedFile?.id === file.id;
              
              return (
                <TouchableOpacity
                  key={file.id}
                  style={[
                    styles.fileTab,
                    {
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                      borderColor: isSelected ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                    }
                  ]}
                  onPress={() => setSelectedFile(file)}
                >
                  <View style={styles.fileIcon}>
                    <LanguageIcon size={16} color={languageColor} />
                  </View>
                  <Text style={[
                    styles.fileName, 
                    { color: isSelected ? '#3B82F6' : theme.colors.text }
                  ]}>
                    {file.name}
                  </Text>
                  <Text style={[styles.filePath, { color: theme.colors.textSecondary }]}>
                    {file.path}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {selectedFile && (
        <View style={styles.editorSection}>
          <View style={styles.editorHeader}>
            <View style={styles.editorMeta}>
              <View style={[styles.languageBadge, { backgroundColor: getLanguageColor(selectedFile.language) + '20' }]}>
                <Text style={[styles.languageText, { color: getLanguageColor(selectedFile.language) }]}>
                  {selectedFile.language.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.fileMeta, { color: theme.colors.textSecondary }]}>
                {selectedFile.path}/{selectedFile.name}
              </Text>
            </View>
            <View style={styles.editorStats}>
              <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
                {selectedFile.content.split('\n').length} lines
              </Text>
              <Text style={[styles.statText, { color: theme.colors.textSecondary }]}>
                {selectedFile.content.length} chars
              </Text>
            </View>
          </View>

          <ScrollView 
            style={styles.codeContainer}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.codeContent}
          >
            <View style={styles.lineNumbers}>
              {selectedFile.content.split('\n').map((_, index) => (
                <Text key={index} style={[styles.lineNumber, { color: theme.colors.textSecondary }]}>
                  {index + 1}
                </Text>
              ))}
            </View>
            <TextInput
              style={[styles.codeInput, { color: theme.colors.text }]}
              value={selectedFile.content}
              multiline
              editable={!readOnly}
              textAlignVertical="top"
              fontFamily="monospace"
            />
          </ScrollView>
        </View>
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  copyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filesSection: {
    marginBottom: 16,
  },
  filesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  fileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  fileIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 13,
    fontWeight: '600',
  },
  filePath: {
    fontSize: 10,
    opacity: 0.7,
  },
  editorSection: {
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  editorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  languageText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fileMeta: {
    fontSize: 11,
  },
  editorStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    maxHeight: 400,
  },
  codeContent: {
    flexDirection: 'row',
  },
  lineNumbers: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
  },
  lineNumber: {
    fontSize: 11,
    fontFamily: 'monospace',
    lineHeight: 20,
    textAlign: 'right',
    minWidth: 24,
  },
  codeInput: {
    flex: 1,
    padding: 12,
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
});