# Kubernetes Infrastructure Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the kaytx application infrastructure on Kubernetes. The infrastructure includes:

- **Kubernetes Configuration** (25h): Advanced security, networking, and resource management
- **Autoscaling** (10h): HPA, VPA, Cluster Autoscaler, and KEDA integration
- **Database Backup** (10h): Automated PostgreSQL and Redis backups with S3 storage
- **Monitoring Infrastructure** (10h): Prometheus, Grafana, AlertManager, and comprehensive observability

## Prerequisites

### Required Tools
- Kubernetes cluster (v1.24+)
- kubectl configured and working
- Helm 3.x
- AWS CLI (for S3 backups)
- Domain name for SSL certificates

### Cluster Requirements
- Minimum 3 nodes (for high availability)
- Each node: 4 CPU, 8GB RAM, 100GB storage
- LoadBalancer service type support
- Ingress controller (nginx-ingress recommended)
- cert-manager for SSL certificates

## Deployment Steps

### 1. Namespace and Core Configuration

```bash
# Apply resource quotas and security policies
kubectl apply -f 05-resource-quotas.yaml

# Apply security hardening configurations
kubectl apply -f 07-security-hardening.yaml
```

### 2. Service Mesh (Optional but Recommended)

```bash
# Deploy Istio service mesh
kubectl apply -f 06-service-mesh.yaml

# Verify Istio installation
kubectl get pods -n istio-system
```

### 3. Application Deployment

```bash
# Deploy core application services
kubectl apply -f 01-configmap-secret.yaml
kubectl apply -f 02-deployment.yaml
kubectl apply -f 03-hpa-rbac-network.yaml
kubectl apply -f 04-ingress.yaml

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app=app -n default --timeout=300s
```

### 4. Advanced Autoscaling

```bash
# Deploy autoscaling configurations
kubectl apply -f 08-advanced-autoscaling.yaml

# Verify HPA status
kubectl get hpa -n default
kubectl get vpa -n default
```

### 5. Database Backup System

```bash
# Configure AWS credentials
kubectl create secret generic backup-secrets \
  --from-literal=AWS_ACCESS_KEY_ID=your-access-key \
  --from-literal=AWS_SECRET_ACCESS_KEY=your-secret-key \
  --from-literal=AWS_DEFAULT_REGION=us-east-1 \
  --from-literal=S3_BUCKET=kaytx-backups \
  -n kaytx

# Deploy backup system
kubectl apply -f 09-database-backup.yaml

# Test backup manually
kubectl create job --from=cronjob/postgres-backup manual-postgres-backup -n kaytx
kubectl create job --from=cronjob/redis-backup manual-redis-backup -n kaytx
```

### 6. Monitoring Stack

```bash
# Deploy monitoring infrastructure
kubectl apply -f 10-monitoring-stack.yaml

# Verify monitoring components
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

## Configuration Details

### Resource Quotas and Limits

The infrastructure enforces strict resource limits:

- **CPU**: 10 cores requested, 20 cores limit
- **Memory**: 20Gi requested, 40Gi limit
- **Storage**: 500Gi total, 50Gi per PVC
- **Pods**: Maximum 50 pods per namespace

### Security Features

- **Pod Security Policies**: Enforce non-root containers
- **Network Policies**: Zero-trust networking model
- **RBAC**: Principle of least privilege
- **Secrets Management**: Encrypted secrets with rotation

### Autoscaling Configuration

- **Horizontal Pod Autoscaler**: 3-20 replicas based on CPU/memory/custom metrics
- **Vertical Pod Autoscaler**: Automatic resource optimization
- **Cluster Autoscaler**: Automatic node scaling
- **KEDA**: Event-driven scaling based on queue length, Kafka lag, etc.

### Backup Strategy

- **PostgreSQL**: Daily full backups with 30-day retention
- **Redis**: Daily RDB snapshots with 30-day retention
- **Storage**: Amazon S3 with lifecycle policies
- **Verification**: Automated backup integrity checks

### Monitoring and Alerting

- **Prometheus**: Metrics collection and storage (30-day retention)
- **Grafana**: Visualization and dashboards
- **AlertManager**: Multi-channel alerting (email, Slack, webhook)
- **SLI/SLO**: Service level objectives with alerting

## Verification and Testing

### Health Checks

```bash
# Check application health
kubectl get pods -n kaytx
kubectl get svc -n kaytx

# Check monitoring
kubectl get pods -n monitoring
curl http://grafana.kaytx.com/api/health

# Test autoscaling
kubectl patch deployment kaytx-backend -p '{"spec":{"replicas":10}}' -n kaytx
```

### Load Testing

```bash
# Install k6 if not present
brew install k6  # macOS
# or
apt-get install k6  # Ubuntu

# Run load test
k6 run --vus 50 --duration 5m load-test.js
```

### Backup Verification

```bash
# List recent backups
kubectl exec -it backup-restore-service-xxx -n kaytx -- \
  aws s3 ls s3://kaytx-backups/postgres/

# Test restore (in staging environment first)
curl -X POST http://backup-restore-service.kaytx.svc.cluster.local:8080/restore/postgres \
  -H "Content-Type: application/json" \
  -d '{"backup_file": "postgres_backup_20231201_020000.sql.gz"}'
```

## Maintenance and Operations

### Daily Tasks

1. **Monitor dashboards**: Check Grafana for anomalies
2. **Review alerts**: Address critical warnings
3. **Backup verification**: Ensure daily backups completed
4. **Resource usage**: Monitor cluster capacity

### Weekly Tasks

1. **Security scans**: Review vulnerability reports
2. **Performance tuning**: Optimize resource allocations
3. **Capacity planning**: Review scaling metrics
4. **Backup testing**: Test restore procedures

### Monthly Tasks

1. **Security updates**: Apply latest patches
2. **Cost optimization**: Review AWS spending
3. **Disaster recovery**: Test failover procedures
4. **Documentation updates**: Update runbooks

## Troubleshooting

### Common Issues

#### Pods Not Starting
```bash
# Check pod status
kubectl describe pod <pod-name> -n kaytx

# Check events
kubectl get events -n kaytx --sort-by='.lastTimestamp'

# Check resource usage
kubectl top pods -n kaytx
```

#### Autoscaling Not Working
```bash
# Check HPA status
kubectl describe hpa kaytx-backend-hpa -n kaytx

# Check metrics server
kubectl get pods -n kube-system | grep metrics-server

# Check resource utilization
kubectl top nodes
kubectl top pods -n kaytx
```

#### Backup Failures
```bash
# Check backup job logs
kubectl logs job/postgres-backup-xxx -n kaytx

# Check S3 connectivity
kubectl exec -it backup-restore-service-xxx -n kaytx -- \
  aws s3 ls s3://kaytx-backups/

# Check AWS credentials
kubectl exec -it backup-restore-service-xxx -n kaytx -- \
  aws sts get-caller-identity
```

#### Monitoring Issues
```bash
# Check Prometheus targets
kubectl port-forward svc/prometheus 9090:9090 -n monitoring
# Visit http://localhost:9090/targets

# Check AlertManager
kubectl port-forward svc/alertmanager 9093:9093 -n monitoring
# Visit http://localhost:9093

# Check Grafana
kubectl port-forward svc/grafana 3000:3000 -n monitoring
# Visit http://localhost:3000 (admin/admin123)
```

## Performance Optimization

### Resource Tuning

1. **CPU Requests**: Set to 50-70% of actual usage
2. **Memory Limits**: Set to 1.5x peak usage
3. **Storage IOPS**: Use SSD for databases
4. **Network**: Use dedicated network for inter-service communication

### Database Optimization

1. **PostgreSQL**: Tune `shared_buffers`, `work_mem`, `maintenance_work_mem`
2. **Redis**: Enable persistence, optimize `maxmemory-policy`
3. **Connection Pooling**: Use PgBouncer for PostgreSQL
4. **Read Replicas**: Scale read traffic with replicas

### Application Optimization

1. **Caching**: Implement Redis caching for frequent queries
2. **Connection Pooling**: Optimize database connection pools
3. **Async Processing**: Use message queues for background tasks
4. **CDN**: Use CloudFront for static assets

## Security Best Practices

### Network Security

1. **Network Policies**: Implement zero-trust networking
2. **Service Mesh**: Use mTLS for service-to-service communication
3. **Ingress Security**: Rate limiting, WAF, DDoS protection
4. **VPC**: Use private subnets for databases

### Application Security

1. **Secrets Management**: Rotate secrets regularly
2. **Image Scanning**: Scan for vulnerabilities
3. **Runtime Security**: Use Falco for threat detection
4. **Compliance**: Regular security audits

### Data Protection

1. **Encryption at Rest**: Enable EBS encryption
2. **Encryption in Transit**: Use TLS everywhere
3. **Backup Encryption**: Encrypt S3 backups
4. **Access Control**: Implement IAM policies

## Scaling Considerations

### Horizontal Scaling

1. **Stateless Services**: Design for easy scaling
2. **Load Balancing**: Use multiple load balancers
3. **Database Sharding**: Consider for large datasets
4. **Caching Layers**: Multiple cache layers for performance

### Vertical Scaling

1. **Resource Monitoring**: Track resource utilization
2. **Right-sizing**: Adjust resources based on usage
3. **Performance Testing**: Regular load testing
4. **Cost Optimization**: Balance performance vs cost

## Disaster Recovery

### Backup Strategy

1. **Multi-region**: Store backups in different regions
2. **Point-in-time**: Enable PITR for databases
3. **Regular Testing**: Test restore procedures monthly
4. **Documentation**: Maintain detailed runbooks

### Failover Procedures

1. **Active-Passive**: Maintain standby environment
2. **DNS Failover**: Use Route 53 for automatic failover
3. **Data Replication**: Cross-region replication
4. **Recovery Time**: Target RTO < 1 hour, RPO < 15 minutes

## Cost Management

### Resource Optimization

1. **Right-sizing**: Regularly review resource allocations
2. **Spot Instances**: Use for non-critical workloads
3. **Reserved Instances**: Commit for 1-3 years for savings
4. **Auto-scaling**: Scale down during off-peak hours

### Monitoring Costs

1. **Cost Allocation**: Tag resources for cost tracking
2. **Budget Alerts**: Set up AWS budget alerts
3. **Usage Reports**: Regular cost analysis
4. **Optimization**: Identify and eliminate waste

## Support and Escalation

### Contact Information

- **Infrastructure Team**: infra@kaytx.com
- **Security Team**: security@kaytx.com
- **On-call Engineer**: +1-555-0123 (24/7)

### Escalation Matrix

| Severity | Response Time | Escalation |
|----------|---------------|------------|
| Critical | 15 minutes | On-call → Team Lead |
| High | 1 hour | Team Lead → Engineering Manager |
| Medium | 4 hours | Engineering Manager → CTO |
| Low | 24 hours | CTO |

## Conclusion

This comprehensive Kubernetes infrastructure provides a robust, scalable, and secure foundation for the kaytx application. Regular maintenance, monitoring, and optimization are essential for maintaining high availability and performance.

For questions or support, contact the infrastructure team at infra@kaytx.com.
