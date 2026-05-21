const fs = require('fs');
const path = require('path');

// Read the original AI agents file
const agentsFile = path.join(__dirname, 'shaida the agents lib by shaida/ai agents 1108');
const agentsContent = fs.readFileSync(agentsFile, 'utf-8');

// Parse the agents from the markdown table
const lines = agentsContent.split('\n');
const agents = [];

// Skip header lines (first 7 lines) and parse each agent
for (let i = 7; i < lines.length; i++) {
  const line = lines[i];
  // Match the table row pattern: | number | name | description |
  // The description column doesn't have a trailing pipe in this format
  const match = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
  if (match) {
    const [, number, name, description] = match;
    agents.push({
      id: parseInt(number),
      name: name.trim(),
      description: description.trim()
    });
  }
}

console.log(`Parsed ${agents.length} agents`);

// Create the complete configuration structure
const completeConfig = {
  ai_agents_configurations: {
    metadata: {
      version: "1.0",
      total_agents: agents.length,
      last_updated: new Date().toISOString().split('T')[0],
      description: "Complete AI Agent Configurations with all features, settings, and options"
    },
    configuration_template: {
      separate_dashboard: {
        enabled: true,
        dashboard_url: "",
        custom_widgets: [],
        real_time_metrics: true,
        data_visualization: true
      },
      security_layer: {
        authentication: {
          enabled: true,
          method: "jwt",
          two_factor_auth: true,
          session_timeout: 3600
        },
        authorization: {
          role_based_access: true,
          permissions: [],
          api_rate_limiting: true
        },
        data_encryption: {
          at_rest: true,
          in_transit: true,
          encryption_method: "AES-256"
        },
        audit_logging: {
          enabled: true,
          log_retention_days: 90,
          sensitive_data_masking: true
        }
      },
      call: {
        enabled: false,
        phone_number: "",
        call_recording: true,
        call_transcription: true,
        voicemail_enabled: true,
        call_forwarding: "",
        call_queue: {
          enabled: false,
          max_wait_time: 300,
          overflow_action: "voicemail"
        },
        ivr_system: {
          enabled: false,
          menu_options: []
        }
      },
      chat_system: {
        enabled: true,
        platforms: ["web", "mobile", "slack", "teams"],
        chat_history_retention: 365,
        file_sharing: true,
        emoji_support: true,
        typing_indicators: true,
        read_receipts: true,
        chat_bots_integration: []
      },
      company_setup: {
        company_id: "",
        company_name: "",
        industry: "",
        company_size: "",
        timezone: "",
        currency: "",
        logo_url: "",
        brand_colors: {
          primary: "",
          secondary: ""
        }
      },
      general_info: {
        agent_id: "",
        name: "",
        display_name: "",
        voice_profile: {
          type: "neural",
          language: "en-US",
          accent: "neutral",
          pitch: "medium",
          speed: "normal"
        },
        role: "",
        availability: {
          status: "available",
          working_hours: {
            start: "09:00",
            end: "18:00",
            timezone: "",
            days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
          },
          on_call_rotation: false
        },
        personality: {
          traits: [],
          communication_style: "professional",
          emotional_intelligence: "high"
        },
        tone: {
          default: "professional",
          adaptive: true,
          custom_tones: []
        }
      },
      voice_and_phone_number: {
        phone_number: "",
        phone_type: "voip",
        country_code: "",
        sms_enabled: true,
        mms_enabled: false,
        call_forwarding: {
          enabled: false,
          destination: ""
        },
        voicemail: {
          enabled: true,
          greeting: "",
          transcription_enabled: true
        }
      },
      sms_voice_call_recording: {
        sms: {
          enabled: true,
          templates: [],
          auto_reply: false,
          keyword_triggers: []
        },
        voice: {
          enabled: false,
          quality: "hd",
          noise_cancellation: true
        },
        call_recording: {
          enabled: true,
          auto_record: true,
          retention_days: 90,
          storage_location: "cloud"
        },
        script: {
          enabled: false,
          custom_scripts: [],
          dynamic_scripting: false
        },
        location: {
          enabled: false,
          tracking: false,
          geofencing: []
        },
        country: {
          operations_country: "",
          compliance_region: "",
          data_residency: ""
        },
        settings: {
          call_waiting: true,
          caller_id: "",
          do_not_disturb: false,
          emergency_override: true
        }
      },
      model_and_language: {
        ai_model: {
          provider: "",
          model_name: "",
          version: "",
          api_endpoint: "",
          custom_fine_tuning: false
        },
        language: {
          primary: "en-US",
          secondary: [],
          auto_detection: true,
          translation_enabled: false
        },
        nlp_settings: {
          intent_recognition: true,
          entity_extraction: true,
          sentiment_analysis: true,
          context_awareness: true
        }
      },
      timing: {
        response_time: {
          target: 2000,
          maximum: 10000,
          sla_compliance: 95
        },
        processing_time: {
          average: 1000,
          peak: 5000
        },
        availability_schedule: {
          "24_7": false,
          business_hours_only: true,
          custom_schedule: []
        },
        time_zone_handling: {
          auto_detect: true,
          default_timezone: "",
          daylight_saving: true
        }
      },
      pricing_and_price_limit: {
        pricing_model: {
          type: "subscription",
          tier: "",
          base_price: 0,
          currency: "USD",
          billing_cycle: "monthly"
        },
        price_limits: {
          max_monthly_spend: 0,
          per_transaction_limit: 0,
          overage_handling: "block",
          budget_alerts: {
            enabled: true,
            threshold_percent: 80
          }
        },
        negotiation: {
          enabled: false,
          auto_negotiate: false,
          negotiation_rules: [],
          discount_tiers: []
        }
      },
      integration: {
        enabled: true,
        integrations: {
          crm: {
            connected: false,
            platform: "",
            sync_frequency: "real-time"
          },
          calendar: {
            connected: false,
            platform: "",
            bi_directional_sync: false
          },
          email: {
            connected: false,
            platform: "",
            auto_response: false
          },
          database: {
            connected: false,
            type: "",
            connection_string: ""
          },
          api: {
            rest_enabled: true,
            graphql_enabled: false,
            webhooks_enabled: true,
            rate_limit: 1000
          }
        },
        custom_integrations: []
      },
      waiting_duration_for_call: {
        max_wait_time: 300,
        queue_position_announcement: true,
        estimated_wait_time: true,
        callback_option: {
          enabled: false,
          max_callback_delay: 3600
        },
        overflow_handling: {
          action: "voicemail",
          backup_agent: ""
        }
      },
      behaviour_and_limitations: {
        behaviour: {
          proactive_engagement: false,
          learning_mode: "continuous",
          adaptation_speed: "medium",
          decision_making: "assisted"
        },
        limitations: {
          max_concurrent_sessions: 10,
          max_daily_interactions: 1000,
          restricted_topics: [],
          escalation_triggers: [],
          human_handoff_conditions: []
        },
        safety_measures: {
          content_filtering: true,
          hallucination_prevention: true,
          bias_detection: true,
          ethical_guidelines: true
        }
      },
      responsibilities_routing_appointment_scheduling: {
        responsibilities: {
          primary_tasks: [],
          secondary_tasks: [],
          escalation_path: [],
          ownership_scope: ""
        },
        routing: {
          rules: [],
          priority_levels: ["low", "medium", "high", "critical"],
          skill_based_routing: false,
          load_balancing: "round_robin"
        },
        appointment_scheduling: {
          enabled: false,
          calendar_integration: "",
          buffer_time: 15,
          cancellation_policy: "",
          reminder_settings: {
            enabled: true,
            advance_notice: [24, 1],
            method: ["email", "sms"]
          }
        }
      },
      task_and_remaining_task_complete: {
        task_management: {
          enabled: true,
          task_creation: "automatic",
          prioritization: "ai_assisted",
          deadline_tracking: true,
          dependency_management: true
        },
        task_completion: {
          auto_complete: false,
          verification_required: true,
          completion_criteria: [],
          quality_check: true
        },
        remaining_tasks: {
          display: true,
          sorting: "priority",
          filtering: true,
          bulk_actions: true
        }
      },
      performance_and_insights: {
        metrics: {
          response_time: true,
          resolution_rate: true,
          customer_satisfaction: true,
          task_completion_rate: true,
          error_rate: true
        },
        analytics: {
          real_time_dashboard: true,
          historical_reports: true,
          trend_analysis: true,
          predictive_insights: false
        },
        insights: {
          performance_summary: "",
          improvement_suggestions: [],
          benchmark_comparison: false,
          goal_tracking: true
        }
      },
      summary_and_notes: {
        summary: {
          auto_generate: true,
          frequency: "daily",
          format: "markdown",
          distribution: []
        },
        notes: {
          enabled: true,
          private_notes: true,
          shared_notes: false,
          note_categories: [],
          search_enabled: true
        }
      },
      predictive_layers: {
        enabled: false,
        models: {
          demand_prediction: false,
          behavior_prediction: false,
          risk_prediction: false,
          trend_forecasting: false
        },
        accuracy_threshold: 0.8,
        retraining_frequency: "monthly",
        data_requirements: []
      },
      rules_and_regulations: {
        compliance: {
          gdpr: false,
          hipaa: false,
          soc2: false,
          pci_dss: false,
          industry_specific: []
        },
        internal_rules: {
          code_of_conduct: true,
          data_handling_policy: true,
          communication_guidelines: true,
          escalation_rules: true
        },
        regulatory_updates: {
          auto_monitor: false,
          notification_enabled: false,
          compliance_checks: []
        }
      },
      memory: {
        short_term: {
          enabled: true,
          capacity: 1000,
          retention_hours: 24
        },
        long_term: {
          enabled: true,
          storage_type: "vector_database",
          retention_days: 365,
          compression: true
        },
        context_memory: {
          enabled: true,
          window_size: 10,
          importance_scoring: true
        },
        knowledge_base: {
          enabled: false,
          sources: [],
          update_frequency: "daily",
          verification: true
        }
      },
      setup_company: {
        profile_setup: {
          company_profile: {
            name: "",
            description: "",
            industry: "",
            size: "",
            website: ""
          },
          branding: {
            logo: "",
            colors: [],
            fonts: [],
            templates: []
          }
        },
        product_and_pricing: {
          products: [],
          pricing_tiers: [],
          discount_rules: [],
          dynamic_pricing: false
        },
        negotiation_rules: {
          enabled: false,
          rules: [],
          authority_levels: [],
          approval_workflow: []
        },
        experience_goal: {
          customer_experience_goals: [],
          quality_metrics: [],
          satisfaction_targets: {}
        },
        training: {
          initial_training: true,
          ongoing_training: true,
          training_materials: [],
          certification_required: false
        },
        knowledge_base: {
          documents: [],
          faqs: [],
          procedures: [],
          access_level: "restricted"
        },
        voice_and_personality: {
          voice_settings: {},
          personality_traits: [],
          communication_guidelines: []
        },
        business_hours: {
          hours: {},
          holidays: [],
          special_schedules: []
        },
        configurations: {
          regional_settings: {},
          language_settings: {},
          currency_settings: {},
          timezone_settings: {}
        }
      },
      two_step_verification: {
        enabled: false,
        methods: ["sms", "email", "authenticator_app"],
        required_for: ["login", "sensitive_operations"],
        backup_codes: false,
        biometric_option: false
      },
      import_and_export_data: {
        import: {
          enabled: true,
          formats: ["csv", "json", "xml"],
          validation: true,
          mapping: true,
          batch_size: 1000
        },
        export: {
          enabled: true,
          formats: ["csv", "json", "pdf", "xml"],
          scheduling: false,
          encryption: true,
          compression: true
        },
        data_migration: {
          enabled: false,
          source_systems: [],
          destination_systems: [],
          transformation_rules: []
        }
      },
      reports: {
        standard_reports: {
          performance_report: {
            enabled: true,
            frequency: "weekly",
            recipients: []
          },
          usage_report: {
            enabled: true,
            frequency: "monthly",
            recipients: []
          },
          error_report: {
            enabled: true,
            frequency: "daily",
            recipients: []
          }
        },
        custom_reports: {
          enabled: true,
          builder_available: true,
          scheduled_reports: []
        },
        report_distribution: {
          email: true,
          dashboard: true,
          api: true,
          webhook: false
        }
      },
      integrations_and_mcp: {
        mcp_servers: {
          enabled: false,
          configured_servers: [],
          auto_discovery: false
        },
        third_party_integrations: {
          slack: {
            connected: false,
            webhook_url: "",
            channels: []
          },
          teams: {
            connected: false,
            webhook_url: "",
            channels: []
          },
          zapier: {
            connected: false,
            api_key: "",
            zaps: []
          },
          custom_webhooks: {
            enabled: false,
            endpoints: [],
            authentication: "bearer_token"
          }
        },
        api_integrations: {
          rest_apis: [],
          graphql_apis: [],
          soap_services: []
        }
      }
    },
    agents: agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      configuration: {
        separate_dashboard: {
          enabled: true,
          dashboard_url: `/dashboard/agent/${agent.id}`,
          custom_widgets: [],
          real_time_metrics: true,
          data_visualization: true
        },
        security_layer: {
          authentication: {
            enabled: true,
            method: "jwt",
            two_factor_auth: true,
            session_timeout: 3600
          },
          authorization: {
            role_based_access: true,
            permissions: [`agent:${agent.id}:read`, `agent:${agent.id}:write`],
            api_rate_limiting: true
          },
          data_encryption: {
            at_rest: true,
            in_transit: true,
            encryption_method: "AES-256"
          },
          audit_logging: {
            enabled: true,
            log_retention_days: 90,
            sensitive_data_masking: true
          }
        },
        call: {
          enabled: false,
          phone_number: "",
          call_recording: true,
          call_transcription: true,
          voicemail_enabled: true,
          call_forwarding: "",
          call_queue: {
            enabled: false,
            max_wait_time: 300,
            overflow_action: "voicemail"
          },
          ivr_system: {
            enabled: false,
            menu_options: []
          }
        },
        chat_system: {
          enabled: true,
          platforms: ["web", "mobile"],
          chat_history_retention: 365,
          file_sharing: true,
          emoji_support: true,
          typing_indicators: true,
          read_receipts: true,
          chat_bots_integration: []
        },
        company_setup: {
          company_id: "",
          company_name: "",
          industry: "",
          company_size: "",
          timezone: "UTC",
          currency: "USD",
          logo_url: "",
          brand_colors: {
            primary: "#007bff",
            secondary: "#6c757d"
          }
        },
        general_info: {
          agent_id: agent.id.toString(),
          name: agent.name,
          display_name: agent.name,
          voice_profile: {
            type: "neural",
            language: "en-US",
            accent: "neutral",
            pitch: "medium",
            speed: "normal"
          },
          role: agent.description,
          availability: {
            status: "available",
            working_hours: {
              start: "09:00",
              end: "18:00",
              timezone: "UTC",
              days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
            },
            on_call_rotation: false
          },
          personality: {
            traits: ["professional", "helpful", "efficient"],
            communication_style: "professional",
            emotional_intelligence: "high"
          },
          tone: {
            default: "professional",
            adaptive: true,
            custom_tones: []
          }
        },
        voice_and_phone_number: {
          phone_number: "",
          phone_type: "voip",
          country_code: "+1",
          sms_enabled: true,
          mms_enabled: false,
          call_forwarding: {
            enabled: false,
            destination: ""
          },
          voicemail: {
            enabled: true,
            greeting: "",
            transcription_enabled: true
          }
        },
        sms_voice_call_recording: {
          sms: {
            enabled: true,
            templates: [],
            auto_reply: false,
            keyword_triggers: []
          },
          voice: {
            enabled: false,
            quality: "hd",
            noise_cancellation: true
          },
          call_recording: {
            enabled: true,
            auto_record: true,
            retention_days: 90,
            storage_location: "cloud"
          },
          script: {
            enabled: false,
            custom_scripts: [],
            dynamic_scripting: false
          },
          location: {
            enabled: false,
            tracking: false,
            geofencing: []
          },
          country: {
            operations_country: "US",
            compliance_region: "US",
            data_residency: "US"
          },
          settings: {
            call_waiting: true,
            caller_id: "",
            do_not_disturb: false,
            emergency_override: true
          }
        },
        model_and_language: {
          ai_model: {
            provider: "openai",
            model_name: "gpt-4",
            version: "latest",
            api_endpoint: "",
            custom_fine_tuning: false
          },
          language: {
            primary: "en-US",
            secondary: [],
            auto_detection: true,
            translation_enabled: false
          },
          nlp_settings: {
            intent_recognition: true,
            entity_extraction: true,
            sentiment_analysis: true,
            context_awareness: true
          }
        },
        timing: {
          response_time: {
            target: 2000,
            maximum: 10000,
            sla_compliance: 95
          },
          processing_time: {
            average: 1000,
            peak: 5000
          },
          availability_schedule: {
            "24_7": false,
            business_hours_only: true,
            custom_schedule: []
          },
          time_zone_handling: {
            auto_detect: true,
            default_timezone: "UTC",
            daylight_saving: true
          }
        },
        pricing_and_price_limit: {
          pricing_model: {
            type: "subscription",
            tier: "standard",
            base_price: 0,
            currency: "USD",
            billing_cycle: "monthly"
          },
          price_limits: {
            max_monthly_spend: 0,
            per_transaction_limit: 0,
            overage_handling: "block",
            budget_alerts: {
              enabled: true,
              threshold_percent: 80
            }
          },
          negotiation: {
            enabled: false,
            auto_negotiate: false,
            negotiation_rules: [],
            discount_tiers: []
          }
        },
        integration: {
          enabled: true,
          integrations: {
            crm: {
              connected: false,
              platform: "",
              sync_frequency: "real-time"
            },
            calendar: {
              connected: false,
              platform: "",
              bi_directional_sync: false
            },
            email: {
              connected: false,
              platform: "",
              auto_response: false
            },
            database: {
              connected: false,
              type: "",
              connection_string: ""
            },
            api: {
              rest_enabled: true,
              graphql_enabled: false,
              webhooks_enabled: true,
              rate_limit: 1000
            }
          },
          custom_integrations: []
        },
        waiting_duration_for_call: {
          max_wait_time: 300,
          queue_position_announcement: true,
          estimated_wait_time: true,
          callback_option: {
            enabled: false,
            max_callback_delay: 3600
          },
          overflow_handling: {
            action: "voicemail",
            backup_agent: ""
          }
        },
        behaviour_and_limitations: {
          behaviour: {
            proactive_engagement: false,
            learning_mode: "continuous",
            adaptation_speed: "medium",
            decision_making: "assisted"
          },
          limitations: {
            max_concurrent_sessions: 10,
            max_daily_interactions: 1000,
            restricted_topics: [],
            escalation_triggers: [],
            human_handoff_conditions: []
          },
          safety_measures: {
            content_filtering: true,
            hallucination_prevention: true,
            bias_detection: true,
            ethical_guidelines: true
          }
        },
        responsibilities_routing_appointment_scheduling: {
          responsibilities: {
            primary_tasks: [agent.description],
            secondary_tasks: [],
            escalation_path: [],
            ownership_scope: agent.name
          },
          routing: {
            rules: [],
            priority_levels: ["low", "medium", "high", "critical"],
            skill_based_routing: false,
            load_balancing: "round_robin"
          },
          appointment_scheduling: {
            enabled: false,
            calendar_integration: "",
            buffer_time: 15,
            cancellation_policy: "",
            reminder_settings: {
              enabled: true,
              advance_notice: [24, 1],
              method: ["email", "sms"]
            }
          }
        },
        task_and_remaining_task_complete: {
          task_management: {
            enabled: true,
            task_creation: "automatic",
            prioritization: "ai_assisted",
            deadline_tracking: true,
            dependency_management: true
          },
          task_completion: {
            auto_complete: false,
            verification_required: true,
            completion_criteria: [],
            quality_check: true
          },
          remaining_tasks: {
            display: true,
            sorting: "priority",
            filtering: true,
            bulk_actions: true
          }
        },
        performance_and_insights: {
          metrics: {
            response_time: true,
            resolution_rate: true,
            customer_satisfaction: true,
            task_completion_rate: true,
            error_rate: true
          },
          analytics: {
            real_time_dashboard: true,
            historical_reports: true,
            trend_analysis: true,
            predictive_insights: false
          },
          insights: {
            performance_summary: "",
            improvement_suggestions: [],
            benchmark_comparison: false,
            goal_tracking: true
          }
        },
        summary_and_notes: {
          summary: {
            auto_generate: true,
            frequency: "daily",
            format: "markdown",
            distribution: []
          },
          notes: {
            enabled: true,
            private_notes: true,
            shared_notes: false,
            note_categories: [],
            search_enabled: true
          }
        },
        predictive_layers: {
          enabled: false,
          models: {
            demand_prediction: false,
            behavior_prediction: false,
            risk_prediction: false,
            trend_forecasting: false
          },
          accuracy_threshold: 0.8,
          retraining_frequency: "monthly",
          data_requirements: []
        },
        rules_and_regulations: {
          compliance: {
            gdpr: false,
            hipaa: false,
            soc2: false,
            pci_dss: false,
            industry_specific: []
          },
          internal_rules: {
            code_of_conduct: true,
            data_handling_policy: true,
            communication_guidelines: true,
            escalation_rules: true
          },
          regulatory_updates: {
            auto_monitor: false,
            notification_enabled: false,
            compliance_checks: []
          }
        },
        memory: {
          short_term: {
            enabled: true,
            capacity: 1000,
            retention_hours: 24
          },
          long_term: {
            enabled: true,
            storage_type: "vector_database",
            retention_days: 365,
            compression: true
          },
          context_memory: {
            enabled: true,
            window_size: 10,
            importance_scoring: true
          },
          knowledge_base: {
            enabled: false,
            sources: [],
            update_frequency: "daily",
            verification: true
          }
        },
        setup_company: {
          profile_setup: {
            company_profile: {
              name: "",
              description: "",
              industry: "",
              size: "",
              website: ""
            },
            branding: {
              logo: "",
              colors: [],
              fonts: [],
              templates: []
            }
          },
          product_and_pricing: {
            products: [],
            pricing_tiers: [],
            discount_rules: [],
            dynamic_pricing: false
          },
          negotiation_rules: {
            enabled: false,
            rules: [],
            authority_levels: [],
            approval_workflow: []
          },
          experience_goal: {
            customer_experience_goals: [],
            quality_metrics: [],
            satisfaction_targets: {}
          },
          training: {
            initial_training: true,
            ongoing_training: true,
            training_materials: [],
            certification_required: false
          },
          knowledge_base: {
            documents: [],
            faqs: [],
            procedures: [],
            access_level: "restricted"
          },
          voice_and_personality: {
            voice_settings: {},
            personality_traits: [],
            communication_guidelines: []
          },
          business_hours: {
            hours: {},
            holidays: [],
            special_schedules: []
          },
          configurations: {
            regional_settings: {},
            language_settings: {},
            currency_settings: {},
            timezone_settings: {}
          }
        },
        two_step_verification: {
          enabled: false,
          methods: ["sms", "email", "authenticator_app"],
          required_for: ["login", "sensitive_operations"],
          backup_codes: false,
          biometric_option: false
        },
        import_and_export_data: {
          import: {
            enabled: true,
            formats: ["csv", "json", "xml"],
            validation: true,
            mapping: true,
            batch_size: 1000
          },
          export: {
            enabled: true,
            formats: ["csv", "json", "pdf", "xml"],
            scheduling: false,
            encryption: true,
            compression: true
          },
          data_migration: {
            enabled: false,
            source_systems: [],
            destination_systems: [],
            transformation_rules: []
          }
        },
        reports: {
          standard_reports: {
            performance_report: {
              enabled: true,
              frequency: "weekly",
              recipients: []
            },
            usage_report: {
              enabled: true,
              frequency: "monthly",
              recipients: []
            },
            error_report: {
              enabled: true,
              frequency: "daily",
              recipients: []
            }
          },
          custom_reports: {
            enabled: true,
            builder_available: true,
            scheduled_reports: []
          },
          report_distribution: {
            email: true,
            dashboard: true,
            api: true,
            webhook: false
          }
        },
        integrations_and_mcp: {
          mcp_servers: {
            enabled: false,
            configured_servers: [],
            auto_discovery: false
          },
          third_party_integrations: {
            slack: {
              connected: false,
              webhook_url: "",
              channels: []
            },
            teams: {
              connected: false,
              webhook_url: "",
              channels: []
            },
            zapier: {
              connected: false,
              api_key: "",
              zaps: []
            },
            custom_webhooks: {
              enabled: false,
              endpoints: [],
              authentication: "bearer_token"
            }
          },
          api_integrations: {
            rest_apis: [],
            graphql_apis: [],
            soap_services: []
          }
        }
      }
    }))
  }
};

// Write the complete configuration to a JSON file
const outputPath = path.join(__dirname, 'shaida the agents lib by shaida/ai-agents-complete-configurations.json');
fs.writeFileSync(outputPath, JSON.stringify(completeConfig, null, 2), 'utf-8');

console.log(`Generated complete configurations for ${agents.length} agents`);
console.log(`Output file: ${outputPath}`);
