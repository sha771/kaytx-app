const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'shaida the agents lib by shaida', 'ai agents 1108');
const content = fs.readFileSync(filePath, 'utf-8');

// Split into lines
const lines = content.split('\n');

// Function to generate uses based on agent name
function generateUses(agentName) {
  const lowerName = agentName.toLowerCase();
  
  // Customer Experience agents - most specific first
  if (lowerName.includes('onboarding') || lowerName.includes('on-boarding')) {
    return 'Onboarding new customers, guiding through setup, ensuring successful adoption';
  }
  if (lowerName.includes('customer journey')) {
    return 'Mapping customer journeys, identifying touchpoints, optimizing customer experiences';
  }
  if (lowerName.includes('cx metrics')) {
    return 'Tracking CX metrics, measuring satisfaction, analyzing customer experience data';
  }
  if (lowerName.includes('cx strategy')) {
    return 'Developing CX strategies, analyzing customer experience, planning improvements';
  }
  if (lowerName.includes('account health')) {
    return 'Monitoring account health, identifying at-risk accounts, tracking customer engagement';
  }
  if (lowerName.includes('success plan')) {
    return 'Creating success plans, coordinating customer success, tracking goal achievement';
  }
  if (lowerName.includes('escalation') && lowerName.includes('manager')) {
    return 'Managing escalations, handling complex issues, coordinating with teams';
  }
  if (lowerName.includes('knowledge base')) {
    return 'Curating knowledge bases, organizing documentation, maintaining help content';
  }
  if (lowerName.includes('support quality')) {
    return 'Auditing support quality, monitoring interactions, ensuring service standards';
  }
  if (lowerName.includes('ux feedback')) {
    return 'Analyzing UX feedback, gathering user insights, identifying improvement areas';
  }
  if (lowerName.includes('experience benchmark')) {
    return 'Benchmarking experiences, comparing with competitors, identifying gaps';
  }
  if (lowerName.includes('personalization')) {
    return 'Personalizing experiences, tailoring content, optimizing user journeys';
  }
  if (lowerName.includes('vp customer success')) {
    return 'Leading customer success, developing strategies, managing customer relationships, driving adoption';
  }
  if (lowerName.includes('vp support')) {
    return 'Leading support operations, managing support teams, optimizing response times, ensuring quality';
  }
  if (lowerName.includes('vp experience')) {
    return 'Leading customer experience, designing experiences, measuring satisfaction, driving improvements';
  }
  if (lowerName.includes('vp retention')) {
    return 'Leading retention strategies, managing loyalty programs, reducing churn, increasing lifetime value';
  }
  if (lowerName.includes('vp loyalty')) {
    return 'Leading loyalty programs, designing rewards, managing tier systems, driving customer engagement';
  }
  if (lowerName.includes('customer support agent')) {
    return 'Providing customer support, answering questions, resolving issues, ensuring satisfaction';
  }
  if (lowerName.includes('ticket resolution')) {
    return 'Resolving tickets, managing ticket queues, tracking resolution times, ensuring closure';
  }
  if (lowerName.includes('complaint handling')) {
    return 'Handling complaints, investigating issues, providing resolutions, improving processes';
  }
  if (lowerName.includes('retention specialist')) {
    return 'Specializing in retention, managing at-risk customers, implementing retention strategies, reducing churn';
  }
  if (lowerName.includes('churn predictor')) {
    return 'Predicting customer churn, analyzing risk factors, identifying at-risk customers';
  }
  if (lowerName.includes('win-back') || lowerName.includes('win back')) {
    return 'Winning back lost customers, designing re-engagement campaigns, analyzing churn reasons';
  }
  if (lowerName.includes('retention metrics')) {
    return 'Tracking retention metrics, analyzing churn data, measuring customer loyalty';
  }
  if (lowerName.includes('rewards program')) {
    return 'Designing rewards programs, creating incentive structures, managing loyalty points';
  }
  if (lowerName.includes('loyalty tier')) {
    return 'Managing loyalty tiers, analyzing tier progression, optimizing tier benefits';
  }
  if (lowerName.includes('engagement scoring')) {
    return 'Scoring customer engagement, tracking activity levels, identifying engaged users';
  }
  if (lowerName.includes('receptionist')) {
    return 'Managing front desk, greeting visitors, handling inquiries';
  }
  if (lowerName.includes('call router')) {
    return 'Routing calls, directing inquiries, optimizing call distribution';
  }
  if (lowerName.includes('visitor logger')) {
    return 'Logging visitors, tracking guest information, maintaining visitor records';
  }
  if (lowerName.includes('appointment scheduler')) {
    return 'Scheduling appointments, managing calendars, coordinating meeting times';
  }
  if (lowerName.includes('faq responder')) {
    return 'Responding to FAQs, answering common questions, providing instant support';
  }
  if (lowerName.includes('troubleshooting guide')) {
    return 'Guiding troubleshooting, providing step-by-step solutions, diagnosing issues';
  }
  if (lowerName.includes('live chat')) {
    return 'Handling live chats, providing real-time support, engaging with customers';
  }
  if (lowerName.includes('ticket classifier')) {
    return 'Classifying tickets, categorizing issues, routing to appropriate teams';
  }
  if (lowerName.includes('solution matcher')) {
    return 'Matching solutions to problems, recommending fixes, suggesting resolutions';
  }
  if (lowerName.includes('escalation router')) {
    return 'Routing escalations, determining priority levels, directing to specialists';
  }
  if (lowerName.includes('complaint categorizer')) {
    return 'Categorizing complaints, classifying issues, analyzing complaint types';
  }
  if (lowerName.includes('resolution tracker')) {
    return 'Tracking resolutions, monitoring issue status, ensuring timely closure';
  }
  if (lowerName.includes('sentiment analyzer')) {
    return 'Analyzing sentiment, detecting emotions, gauging customer mood';
  }
  if (lowerName.includes('at-risk identifier')) {
    return 'Identifying at-risk customers, analyzing warning signs, flagging accounts';
  }
  if (lowerName.includes('offer optimizer')) {
    return 'Optimizing retention offers, designing incentives, personalizing deals';
  }
  if (lowerName.includes('follow-up scheduler')) {
    return 'Scheduling follow-ups, timing outreach, coordinating check-ins';
  }
  if (lowerName.includes('points calculator')) {
    return 'Calculating loyalty points, tracking rewards, managing point balances';
  }
  if (lowerName.includes('reward recommender')) {
    return 'Recommending rewards, suggesting incentives, personalizing offers';
  }
  if (lowerName.includes('engagement tracker')) {
    return 'Tracking engagement, monitoring activity, measuring interaction levels';
  }
  if (lowerName.includes('survey designer')) {
    return 'Designing surveys, creating questionnaires, structuring feedback forms';
  }
  if (lowerName.includes('response analyzer')) {
    return 'Analyzing survey responses, interpreting feedback, extracting insights';
  }
  if (lowerName.includes('insight reporter')) {
    return 'Reporting insights, summarizing findings, presenting conclusions';
  }
  if (lowerName.includes('payment processor')) {
    return 'Processing payments, handling transactions, managing payment flows';
  }
  if (lowerName.includes('invoice explainer')) {
    return 'Explaining invoices, clarifying charges, answering billing questions';
  }
  if (lowerName.includes('dispute resolver')) {
    return 'Resolving disputes, handling conflicts, mediating billing issues';
  }
  
  // Sales agents
  if (lowerName.includes('pipeline analyst')) {
    return 'Analyzing sales pipelines, tracking deal progress, identifying bottlenecks';
  }
  if (lowerName.includes('quota tracker')) {
    return 'Tracking quotas, monitoring sales targets, measuring goal achievement';
  }
  if (lowerName.includes('territory planner')) {
    return 'Planning territories, defining sales regions, optimizing coverage';
  }
  if (lowerName.includes('revenue modeler')) {
    return 'Modeling revenue, forecasting income, projecting financial outcomes';
  }
  if (lowerName.includes('pricing optimizer')) {
    return 'Optimizing pricing, analyzing price sensitivity, maximizing revenue';
  }
  if (lowerName.includes('forecast validator')) {
    return 'Validating forecasts, checking accuracy, adjusting predictions';
  }
  if (lowerName.includes('partnership scout')) {
    return 'Scouting partnerships, identifying opportunities, evaluating potential partners';
  }
  if (lowerName.includes('market expander')) {
    return 'Expanding markets, identifying growth opportunities, entering new regions';
  }
  if (lowerName.includes('alliance coordinator')) {
    return 'Coordinating alliances, managing partnerships, fostering collaboration';
  }
  if (lowerName.includes('partner onboarding')) {
    return 'Onboarding partners, guiding setup, ensuring successful integration';
  }
  if (lowerName.includes('channel performance')) {
    return 'Tracking channel performance, monitoring partner metrics, evaluating effectiveness';
  }
  if (lowerName.includes('co-marketing')) {
    return 'Coordinating co-marketing, planning joint campaigns, executing collaborative promotions';
  }
  if (lowerName.includes('crm data cleaner')) {
    return 'Cleaning CRM data, maintaining data quality, deduplicating records';
  }
  if (lowerName.includes('sales process auditor')) {
    return 'Auditing sales processes, identifying inefficiencies, recommending improvements';
  }
  if (lowerName.includes('reporting automator')) {
    return 'Automating reports, generating dashboards, scheduling updates';
  }
  if (lowerName.includes('prospect researcher')) {
    return 'Researching prospects, gathering intelligence, building prospect profiles';
  }
  if (lowerName.includes('outreach sequencer')) {
    return 'Sequencing outreach, planning campaigns, timing communications';
  }
  if (lowerName.includes('lead scorer')) {
    return 'Scoring leads, ranking prospects, prioritizing opportunities';
  }
  if (lowerName.includes('discovery questioner')) {
    return 'Asking discovery questions, uncovering needs, understanding requirements';
  }
  if (lowerName.includes('demo coordinator')) {
    return 'Coordinating demos, scheduling presentations, managing product demonstrations';
  }
  if (lowerName.includes('objection handler')) {
    return 'Handling objections, addressing concerns, overcoming resistance';
  }
  if (lowerName.includes('deal structurer')) {
    return 'Structuring deals, designing proposals, creating offer packages';
  }
  if (lowerName.includes('stakeholder mapper')) {
    return 'Mapping stakeholders, identifying decision makers, understanding influence';
  }
  if (lowerName.includes('closing strategist')) {
    return 'Developing closing strategies, planning final approaches, securing deals';
  }
  if (lowerName.includes('contact updater')) {
    return 'Updating contacts, maintaining records, keeping information current';
  }
  if (lowerName.includes('activity logger')) {
    return 'Logging activities, tracking interactions, maintaining history';
  }
  if (lowerName.includes('pipeline organizer')) {
    return 'Organizing pipelines, managing deal stages, tracking progress';
  }
  if (lowerName.includes('template selector')) {
    return 'Selecting templates, choosing formats, customizing documents';
  }
  if (lowerName.includes('pricing calculator')) {
    return 'Calculating pricing, estimating costs, determining quotes';
  }
  if (lowerName.includes('proposal reviewer')) {
    return 'Reviewing proposals, checking quality, ensuring accuracy';
  }
  if (lowerName.includes('term analyzer')) {
    return 'Analyzing terms, reviewing conditions, assessing implications';
  }
  if (lowerName.includes('concession tracker')) {
    return 'Tracking concessions, monitoring negotiations, recording compromises';
  }
  if (lowerName.includes('batna calculator')) {
    return 'Calculating BATNA, determining alternatives, assessing options';
  }
  if (lowerName.includes('competitor price')) {
    return 'Tracking competitor prices, monitoring market rates, comparing pricing';
  }
  if (lowerName.includes('margin calculator')) {
    return 'Calculating margins, analyzing profitability, optimizing returns';
  }
  if (lowerName.includes('discount approver')) {
    return 'Approving discounts, authorizing price reductions, managing exceptions';
  }
  if (lowerName.includes('trend analyzer') && lowerName.includes('sales')) {
    return 'Analyzing sales trends, identifying patterns, forecasting demand';
  }
  if (lowerName.includes('seasonality adjuster')) {
    return 'Adjusting for seasonality, accounting for patterns, normalizing data';
  }
  if (lowerName.includes('pipeline weighter')) {
    return 'Weighting pipelines, assigning probabilities, forecasting revenue';
  }
  if (lowerName.includes('content recommender') && lowerName.includes('sales')) {
    return 'Recommending sales content, suggesting materials, providing resources';
  }
  if (lowerName.includes('training scheduler') && lowerName.includes('sales')) {
    return 'Scheduling sales training, planning workshops, coordinating learning';
  }
  if (lowerName.includes('playbook updater')) {
    return 'Updating playbooks, maintaining best practices, refining processes';
  }
  
  // Marketing agents
  if (lowerName.includes('marketing strategy')) {
    return 'Developing marketing strategies, planning campaigns, defining objectives';
  }
  if (lowerName.includes('budget allocator') && lowerName.includes('marketing')) {
    return 'Allocating marketing budgets, optimizing spend, managing resources';
  }
  if (lowerName.includes('campaign roi')) {
    return 'Evaluating campaign ROI, measuring returns, optimizing performance';
  }
  if (lowerName.includes('channel planner')) {
    return 'Planning channels, selecting platforms, optimizing mix';
  }
  if (lowerName.includes('marketing calendar')) {
    return 'Managing marketing calendars, scheduling campaigns, coordinating timing';
  }
  if (lowerName.includes('campaign coordinator')) {
    return 'Coordinating campaigns, managing execution, ensuring delivery';
  }
  if (lowerName.includes('brand perception')) {
    return 'Monitoring brand perception, tracking sentiment, measuring awareness';
  }
  if (lowerName.includes('brand guidelines')) {
    return 'Enforcing brand guidelines, maintaining consistency, ensuring compliance';
  }
  if (lowerName.includes('visual identity')) {
    return 'Auditing visual identity, reviewing designs, maintaining brand standards';
  }
  if (lowerName.includes('experiment designer') && lowerName.includes('growth')) {
    return 'Designing experiments, planning tests, defining hypotheses';
  }
  if (lowerName.includes('funnel analyzer')) {
    return 'Analyzing funnels, tracking conversions, identifying drop-offs';
  }
  if (lowerName.includes('a/b test')) {
    return 'Coordinating A/B tests, managing experiments, analyzing results';
  }
  if (lowerName.includes('editorial calendar')) {
    return 'Planning editorial calendars, scheduling content, managing publishing';
  }
  if (lowerName.includes('content quality')) {
    return 'Reviewing content quality, ensuring standards, maintaining excellence';
  }
  if (lowerName.includes('repurposing')) {
    return 'Repurposing content, adapting materials, maximizing value';
  }
  if (lowerName.includes('digital channel')) {
    return 'Optimizing digital channels, managing online presence, improving performance';
  }
  if (lowerName.includes('web performance')) {
    return 'Tracking web performance, monitoring metrics, optimizing user experience';
  }
  if (lowerName.includes('conversion analyst')) {
    return 'Analyzing conversions, tracking rates, optimizing funnels';
  }
  if (lowerName.includes('task assigner') && lowerName.includes('marketing')) {
    return 'Assigning marketing tasks, managing workloads, coordinating teams';
  }
  if (lowerName.includes('deadline tracker') && lowerName.includes('marketing')) {
    return 'Tracking marketing deadlines, managing schedules, ensuring timely delivery';
  }
  if (lowerName.includes('marketing spend')) {
    return 'Monitoring marketing spend, tracking budgets, optimizing allocation';
  }
  if (lowerName.includes('blog writer')) {
    return 'Writing blogs, creating articles, producing content';
  }
  if (lowerName.includes('copy editor')) {
    return 'Editing copy, reviewing content, ensuring quality';
  }
  if (lowerName.includes('content distributor')) {
    return 'Distributing content, publishing materials, managing channels';
  }
  if (lowerName.includes('keyword researcher')) {
    return 'Researching keywords, identifying opportunities, optimizing SEO';
  }
  if (lowerName.includes('on-page optimizer')) {
    return 'Optimizing on-page elements, improving SEO, enhancing content';
  }
  if (lowerName.includes('backlink analyzer')) {
    return 'Analyzing backlinks, monitoring link profiles, building authority';
  }
  if (lowerName.includes('post scheduler') && lowerName.includes('social')) {
    return 'Scheduling social posts, planning content, managing calendars';
  }
  if (lowerName.includes('engagement responder') && lowerName.includes('social')) {
    return 'Responding to social engagement, managing interactions, building community';
  }
  if (lowerName.includes('trend monitor') && lowerName.includes('social')) {
    return 'Monitoring social trends, tracking hashtags, identifying opportunities';
  }
  if (lowerName.includes('list segmenter')) {
    return 'Segmenting email lists, targeting audiences, personalizing campaigns';
  }
  if (lowerName.includes('template designer') && lowerName.includes('email')) {
    return 'Designing email templates, creating layouts, optimizing formats';
  }
  if (lowerName.includes('deliverability monitor')) {
    return 'Monitoring deliverability, tracking email performance, ensuring inbox placement';
  }
  if (lowerName.includes('bid optimizer') && lowerName.includes('ad')) {
    return 'Optimizing ad bids, managing budgets, maximizing ROI';
  }
  if (lowerName.includes('creative tester') && lowerName.includes('ad')) {
    return 'Testing ad creatives, comparing variations, optimizing performance';
  }
  if (lowerName.includes('audience targeter')) {
    return 'Targeting audiences, defining segments, reaching prospects';
  }
  if (lowerName.includes('attribution modeler')) {
    return 'Modeling attribution, tracking conversions, assigning credit';
  }
  if (lowerName.includes('kpi dashboard') && lowerName.includes('marketing')) {
    return 'Building marketing dashboards, visualizing metrics, tracking KPIs';
  }
  if (lowerName.includes('insight summarizer') && lowerName.includes('marketing')) {
    return 'Summarizing marketing insights, extracting findings, reporting results';
  }
  if (lowerName.includes('competitor brand')) {
    return 'Tracking competitor brands, monitoring positioning, analyzing strategies';
  }
  if (lowerName.includes('brand health')) {
    return 'Surveying brand health, measuring perception, tracking metrics';
  }
  if (lowerName.includes('messaging aligner')) {
    return 'Aligning messaging, ensuring consistency, coordinating communications';
  }
  if (lowerName.includes('viral loop')) {
    return 'Designing viral loops, creating shareable content, driving growth';
  }
  if (lowerName.includes('referral program')) {
    return 'Building referral programs, designing incentives, managing advocates';
  }
  if (lowerName.includes('acquisition channel')) {
    return 'Testing acquisition channels, evaluating performance, optimizing spend';
  }
  
  // Operations agents
  if (lowerName.includes('operational efficiency')) {
    return 'Analyzing operational efficiency, identifying improvements, optimizing processes';
  }
  if (lowerName.includes('cross-dept')) {
    return 'Coordinating cross-department efforts, facilitating collaboration, breaking silos';
  }
  if (lowerName.includes('strategic initiative')) {
    return 'Tracking strategic initiatives, monitoring progress, ensuring execution';
  }
  if (lowerName.includes('process auditor') && lowerName.includes('operations')) {
    return 'Auditing processes, identifying inefficiencies, recommending improvements';
  }
  if (lowerName.includes('sla monitor') && lowerName.includes('operations')) {
    return 'Monitoring SLAs, tracking performance, ensuring compliance';
  }
  if (lowerName.includes('capacity planner') && lowerName.includes('operations')) {
    return 'Planning capacity, forecasting needs, optimizing resources';
  }
  if (lowerName.includes('supplier risk')) {
    return 'Assessing supplier risks, evaluating vendors, managing dependencies';
  }
  if (lowerName.includes('inventory optimizer') && lowerName.includes('supply chain')) {
    return 'Optimizing inventory, managing stock levels, reducing carrying costs';
  }
  if (lowerName.includes('logistics cost')) {
    return 'Analyzing logistics costs, identifying savings, optimizing spend';
  }
  if (lowerName.includes('quality standards') && lowerName.includes('operations')) {
    return 'Enforcing quality standards, maintaining compliance, ensuring excellence';
  }
  if (lowerName.includes('defect pattern') && lowerName.includes('operations')) {
    return 'Analyzing defect patterns, identifying root causes, preventing issues';
  }
  if (lowerName.includes('compliance tracker') && lowerName.includes('operations')) {
    return 'Tracking compliance, monitoring regulations, ensuring adherence';
  }
  if (lowerName.includes('space utilization')) {
    return 'Analyzing space utilization, optimizing layouts, managing facilities';
  }
  if (lowerName.includes('maintenance scheduler') && lowerName.includes('facilities')) {
    return 'Scheduling maintenance, planning repairs, optimizing uptime';
  }
  if (lowerName.includes('energy efficiency')) {
    return 'Monitoring energy efficiency, reducing consumption, optimizing costs';
  }
  if (lowerName.includes('milestone tracker') && lowerName.includes('project')) {
    return 'Tracking milestones, monitoring progress, ensuring deadlines';
  }
  if (lowerName.includes('resource allocator') && lowerName.includes('project')) {
    return 'Allocating resources, managing capacity, optimizing utilization';
  }
  if (lowerName.includes('risk identifier') && lowerName.includes('project')) {
    return 'Identifying project risks, assessing threats, planning mitigations';
  }
  if (lowerName.includes('daily operations')) {
    return 'Coordinating daily operations, managing workflows, ensuring smooth execution';
  }
  if (lowerName.includes('escalation handler') && lowerName.includes('operations')) {
    return 'Handling escalations, resolving issues, coordinating responses';
  }
  if (lowerName.includes('performance reporter') && lowerName.includes('operations')) {
    return 'Reporting operational performance, tracking metrics, identifying trends';
  }
  if (lowerName.includes('workflow monitor')) {
    return 'Monitoring workflows, tracking processes, identifying bottlenecks';
  }
  if (lowerName.includes('bottleneck detector')) {
    return 'Detecting bottlenecks, identifying constraints, optimizing flow';
  }
  if (lowerName.includes('efficiency reporter') && lowerName.includes('operations')) {
    return 'Reporting efficiency, tracking metrics, identifying improvements';
  }
  if (lowerName.includes('process mapper')) {
    return 'Mapping processes, documenting workflows, visualizing operations';
  }
  if (lowerName.includes('automation rule')) {
    return 'Building automation rules, configuring workflows, streamlining processes';
  }
  if (lowerName.includes('exception handler') && lowerName.includes('workflow')) {
    return 'Handling exceptions, managing errors, ensuring continuity';
  }
  if (lowerName.includes('task prioritizer')) {
    return 'Prioritizing tasks, managing workloads, optimizing schedules';
  }
  if (lowerName.includes('deadline enforcer')) {
    return 'Enforcing deadlines, tracking due dates, ensuring timely delivery';
  }
  if (lowerName.includes('dependency tracker')) {
    return 'Tracking dependencies, managing relationships, coordinating tasks';
  }
  if (lowerName.includes('lean analyst')) {
    return 'Analyzing processes for lean, identifying waste, recommending improvements';
  }
  if (lowerName.includes('waste identifier') && lowerName.includes('process')) {
    return 'Identifying waste, categorizing inefficiencies, proposing solutions';
  }
  if (lowerName.includes('improvement recommender') && lowerName.includes('process')) {
    return 'Recommending improvements, suggesting changes, optimizing processes';
  }
  if (lowerName.includes('demand forecaster') && lowerName.includes('resource')) {
    return 'Forecasting resource demand, predicting needs, planning capacity';
  }
  if (lowerName.includes('allocation optimizer') && lowerName.includes('resource')) {
    return 'Optimizing resource allocation, maximizing utilization, balancing workloads';
  }
  if (lowerName.includes('utilization tracker') && lowerName.includes('resource')) {
    return 'Tracking resource utilization, monitoring capacity, identifying gaps';
  }
  if (lowerName.includes('test case generator') && lowerName.includes('quality')) {
    return 'Generating test cases, designing scenarios, ensuring coverage';
  }
  if (lowerName.includes('defect logger') && lowerName.includes('quality')) {
    return 'Logging defects, tracking issues, managing bug reports';
  }
  if (lowerName.includes('regression tracker') && lowerName.includes('quality')) {
    return 'Tracking regressions, monitoring quality, preventing defects';
  }
  
  // Finance agents
  if (lowerName.includes('financial strategy') && lowerName.includes('cfo')) {
    return 'Advising on financial strategy, planning fiscal direction, optimizing capital';
  }
  if (lowerName.includes('capital allocation')) {
    return 'Allocating capital, optimizing investments, managing resources';
  }
  if (lowerName.includes('risk-reward') && lowerName.includes('finance')) {
    return 'Analyzing risk-reward, assessing investments, balancing portfolios';
  }
  if (lowerName.includes('financial modeler')) {
    return 'Building financial models, projecting outcomes, analyzing scenarios';
  }
  if (lowerName.includes('cash flow')) {
    return 'Forecasting cash flow, managing liquidity, planning finances';
  }
  if (lowerName.includes('investment appraiser')) {
    return 'Appraising investments, evaluating opportunities, assessing value';
  }
  if (lowerName.includes('ledger reconciler')) {
    return 'Reconciling ledgers, balancing accounts, ensuring accuracy';
  }
  if (lowerName.includes('accounting standards')) {
    return 'Enforcing accounting standards, ensuring compliance, maintaining quality';
  }
  if (lowerName.includes('close process')) {
    return 'Coordinating close processes, managing periods, ensuring timely reporting';
  }
  if (lowerName.includes('liquidity manager') && lowerName.includes('treasury')) {
    return 'Managing liquidity, optimizing cash, ensuring solvency';
  }
  if (lowerName.includes('fx risk')) {
    return 'Hedging FX risk, managing currency exposure, protecting value';
  }
  if (lowerName.includes('bank relationship')) {
    return 'Coordinating bank relationships, managing accounts, optimizing services';
  }
  if (lowerName.includes('earnings report')) {
    return 'Drafting earnings reports, preparing financial statements, communicating results';
  }
  if (lowerName.includes('investor query')) {
    return 'Responding to investor queries, managing communications, building relationships';
  }
  if (lowerName.includes('market sentiment') && lowerName.includes('investor')) {
    return 'Tracking market sentiment, monitoring investor perception, analyzing feedback';
  }
  if (lowerName.includes('gl reviewer')) {
    return 'Reviewing general ledgers, auditing accounts, ensuring accuracy';
  }
  if (lowerName.includes('variance analyzer') && lowerName.includes('controller')) {
    return 'Analyzing variances, investigating differences, explaining performance';
  }
  if (lowerName.includes('internal policy') && lowerName.includes('controller')) {
    return 'Enforcing internal policies, ensuring compliance, maintaining controls';
  }
  if (lowerName.includes('budget tracker') && lowerName.includes('finance')) {
    return 'Tracking budgets, monitoring spend, managing variances';
  }
  if (lowerName.includes('expense approver') && lowerName.includes('finance')) {
    return 'Approving expenses, reviewing requests, enforcing policies';
  }
  if (lowerName.includes('financial report') && lowerName.includes('compiler')) {
    return 'Compiling financial reports, aggregating data, producing statements';
  }
  if (lowerName.includes('journal entry')) {
    return 'Reviewing journal entries, ensuring accuracy, maintaining records';
  }
  if (lowerName.includes('sub-ledger')) {
    return 'Reconciling sub-ledgers, balancing accounts, ensuring accuracy';
  }
  if (lowerName.includes('month-end')) {
    return 'Coordinating month-end, managing closings, ensuring timely reporting';
  }
  if (lowerName.includes('ratio calculator') && lowerName.includes('financial')) {
    return 'Calculating financial ratios, analyzing performance, benchmarking results';
  }
  if (lowerName.includes('trend projector') && lowerName.includes('financial')) {
    return 'Projecting financial trends, forecasting performance, identifying patterns';
  }
  if (lowerName.includes('benchmark comparator') && lowerName.includes('financial')) {
    return 'Comparing benchmarks, analyzing competitors, evaluating performance';
  }
  if (lowerName.includes('budget planner') && lowerName.includes('budget manager')) {
    return 'Planning budgets, forecasting expenses, allocating resources';
  }
  if (lowerName.includes('variance reporter') && lowerName.includes('budget')) {
    return 'Reporting variances, explaining differences, identifying issues';
  }
  if (lowerName.includes('forecast adjuster') && lowerName.includes('budget')) {
    return 'Adjusting forecasts, updating predictions, refining estimates';
  }
  if (lowerName.includes('tax code')) {
    return 'Researching tax codes, interpreting regulations, ensuring compliance';
  }
  if (lowerName.includes('return preparer') && lowerName.includes('tax')) {
    return 'Preparing tax returns, filing documents, ensuring accuracy';
  }
  if (lowerName.includes('deduction optimizer') && lowerName.includes('tax')) {
    return 'Optimizing deductions, maximizing savings, ensuring compliance';
  }
  if (lowerName.includes('audit planner') && lowerName.includes('audit manager')) {
    return 'Planning audits, scheduling reviews, coordinating assessments';
  }
  if (lowerName.includes('finding tracker') && lowerName.includes('audit')) {
    return 'Tracking audit findings, monitoring issues, ensuring resolution';
  }
  if (lowerName.includes('remediation follow-up')) {
    return 'Following up on remediation, tracking progress, ensuring completion';
  }
  if (lowerName.includes('cash position') && lowerName.includes('treasury')) {
    return 'Monitoring cash position, tracking liquidity, managing funds';
  }
  if (lowerName.includes('investment yield') && lowerName.includes('treasury')) {
    return 'Tracking investment yields, monitoring returns, optimizing performance';
  }
  if (lowerName.includes('debt schedule')) {
    return 'Managing debt schedules, tracking obligations, planning payments';
  }
  
  // Technology agents
  if (lowerName.includes('tech strategy') && lowerName.includes('cto')) {
    return 'Advising on tech strategy, planning technology direction, aligning with business';
  }
  if (lowerName.includes('innovation scout') && lowerName.includes('cto')) {
    return 'Scouting innovations, identifying emerging tech, evaluating opportunities';
  }
  if (lowerName.includes('architecture reviewer') && lowerName.includes('cto')) {
    return 'Reviewing architecture, evaluating designs, ensuring quality';
  }
  if (lowerName.includes('sprint capacity') && lowerName.includes('engineering')) {
    return 'Planning sprint capacity, estimating velocity, optimizing throughput';
  }
  if (lowerName.includes('engineering metrics')) {
    return 'Tracking engineering metrics, monitoring performance, identifying trends';
  }
  if (lowerName.includes('tech debt') && lowerName.includes('engineering')) {
    return 'Prioritizing tech debt, managing backlog, planning remediation';
  }
  if (lowerName.includes('cloud cost') && lowerName.includes('infrastructure')) {
    return 'Optimizing cloud costs, managing spend, reducing waste';
  }
  if (lowerName.includes('uptime monitor') && lowerName.includes('infrastructure')) {
    return 'Monitoring uptime, tracking availability, ensuring reliability';
  }
  if (lowerName.includes('scalability planner') && lowerName.includes('infrastructure')) {
    return 'Planning scalability, designing for growth, ensuring capacity';
  }
  if (lowerName.includes('model performance') && lowerName.includes('ai/ml')) {
    return 'Monitoring model performance, tracking accuracy, optimizing models';
  }
  if (lowerName.includes('training data') && lowerName.includes('ai/ml')) {
    return 'Curating training data, managing datasets, ensuring quality';
  }
  if (lowerName.includes('ethics reviewer') && lowerName.includes('ai/ml')) {
    return 'Reviewing AI ethics, ensuring responsible use, assessing risks';
  }
  if (lowerName.includes('security tool') && lowerName.includes('evaluator')) {
    return 'Evaluating security tools, assessing solutions, recommending technologies';
  }
  if (lowerName.includes('threat intelligence') && lowerName.includes('aggregator')) {
    return 'Aggregating threat intelligence, monitoring risks, analyzing threats';
  }
  if (lowerName.includes('vulnerability scanner') && lowerName.includes('security technology')) {
    return 'Scanning vulnerabilities, identifying risks, assessing exposure';
  }
  if (lowerName.includes('design pattern') && lowerName.includes('architect')) {
    return 'Advising on design patterns, recommending architectures, ensuring best practices';
  }
  if (lowerName.includes('integration planner') && lowerName.includes('architect')) {
    return 'Planning integrations, designing interfaces, ensuring compatibility';
  }
  if (lowerName.includes('tech standard') && lowerName.includes('enforcer')) {
    return 'Enforcing tech standards, maintaining consistency, ensuring quality';
  }
  if (lowerName.includes('cicd pipeline') && lowerName.includes('optimizer')) {
    return 'Optimizing CI/CD pipelines, improving efficiency, reducing build times';
  }
  if (lowerName.includes('deployment coordinator') && lowerName.includes('devops')) {
    return 'Coordinating deployments, managing releases, ensuring smooth transitions';
  }
  if (lowerName.includes('incident commander') && lowerName.includes('devops')) {
    return 'Commanding incidents, coordinating responses, managing outages';
  }
  if (lowerName.includes('ui component') && lowerName.includes('librarian')) {
    return 'Managing UI components, maintaining libraries, ensuring consistency';
  }
  if (lowerName.includes('performance profiler') && lowerName.includes('frontend')) {
    return 'Profiling frontend performance, identifying bottlenecks, optimizing speed';
  }
  if (lowerName.includes('accessibility auditor') && lowerName.includes('frontend')) {
    return 'Auditing accessibility, ensuring compliance, improving usability';
  }
  if (lowerName.includes('api design') && lowerName.includes('reviewer')) {
    return 'Reviewing API designs, ensuring quality, maintaining standards';
  }
  if (lowerName.includes('database query') && lowerName.includes('optimizer')) {
    return 'Optimizing database queries, improving performance, reducing latency';
  }
  if (lowerName.includes('service mesh') && lowerName.includes('coordinator')) {
    return 'Coordinating service meshes, managing microservices, ensuring reliability';
  }
  if (lowerName.includes('sla calculator') && lowerName.includes('sre')) {
    return 'Calculating SLAs, defining metrics, setting targets';
  }
  if (lowerName.includes('incident post-mortem')) {
    return 'Facilitating post-mortems, analyzing incidents, identifying improvements';
  }
  if (lowerName.includes('chaos engineering') && lowerName.includes('planner')) {
    return 'Planning chaos engineering, designing tests, improving resilience';
  }
  if (lowerName.includes('component builder') && lowerName.includes('frontend')) {
    return 'Building components, creating UI elements, maintaining libraries';
  }
  if (lowerName.includes('style enforcer') && lowerName.includes('frontend')) {
    return 'Enforcing styles, maintaining consistency, ensuring quality';
  }
  if (lowerName.includes('cross-browser') && lowerName.includes('tester')) {
    return 'Testing across browsers, ensuring compatibility, identifying issues';
  }
  if (lowerName.includes('api endpoint') && lowerName.includes('developer')) {
    return 'Developing API endpoints, creating services, implementing logic';
  }
  if (lowerName.includes('data validator') && lowerName.includes('backend')) {
    return 'Validating data, ensuring quality, preventing errors';
  }
  if (lowerName.includes('service integrator') && lowerName.includes('backend')) {
    return 'Integrating services, connecting systems, ensuring compatibility';
  }
  if (lowerName.includes('alert tuner') && lowerName.includes('sre')) {
    return 'Tuning alerts, reducing noise, improving responsiveness';
  }
  if (lowerName.includes('runbook author') && lowerName.includes('sre')) {
    return 'Authoring runbooks, documenting procedures, ensuring knowledge transfer';
  }
  if (lowerName.includes('capacity monitor') && lowerName.includes('sre')) {
    return 'Monitoring capacity, tracking resources, ensuring availability';
  }
  if (lowerName.includes('test framework') && lowerName.includes('maintainer')) {
    return 'Maintaining test frameworks, updating tools, ensuring quality';
  }
  if (lowerName.includes('e2e test') && lowerName.includes('writer')) {
    return 'Writing E2E tests, covering scenarios, ensuring quality';
  }
  if (lowerName.includes('flaky test') && lowerName.includes('detector')) {
    return 'Detecting flaky tests, identifying instability, improving reliability';
  }
  if (lowerName.includes('pipeline builder') && lowerName.includes('data engineer')) {
    return 'Building data pipelines, creating ETL processes, ensuring data flow';
  }
  if (lowerName.includes('data quality') && lowerName.includes('checker')) {
    return 'Checking data quality, validating information, ensuring accuracy';
  }
  if (lowerName.includes('schema migration') && lowerName.includes('planner')) {
    return 'Planning schema migrations, managing changes, ensuring compatibility';
  }
  if (lowerName.includes('security patch') && lowerName.includes('tracker')) {
    return 'Tracking security patches, monitoring updates, ensuring currency';
  }
  if (lowerName.includes('pen-test') && lowerName.includes('script writer')) {
    return 'Writing pen-test scripts, automating security tests, identifying vulnerabilities';
  }
  if (lowerName.includes('access policy') && lowerName.includes('implementer')) {
    return 'Implementing access policies, enforcing security, managing permissions';
  }
  
  // HR agents
  if (lowerName.includes('hr strategy') && lowerName.includes('cho')) {
    return 'Advising on HR strategy, planning workforce, aligning with business';
  }
  if (lowerName.includes('workforce planner') && lowerName.includes('hr')) {
    return 'Planning workforce, forecasting needs, optimizing staffing';
  }
  if (lowerName.includes('culture health') && lowerName.includes('hr')) {
    return 'Monitoring culture health, measuring engagement, identifying issues';
  }
  if (lowerName.includes('talent pipeline') && lowerName.includes('analyst')) {
    return 'Analyzing talent pipelines, identifying gaps, planning succession';
  }
  if (lowerName.includes('employer brand') && lowerName.includes('strategist')) {
    return 'Strategizing employer brand, building reputation, attracting talent';
  }
  if (lowerName.includes('hiring forecast') && lowerName.includes('planner')) {
    return 'Forecasting hiring needs, planning recruitment, managing capacity';
  }
  if (lowerName.includes('hr process') && lowerName.includes('automator')) {
    return 'Automating HR processes, streamlining workflows, improving efficiency';
  }
  if (lowerName.includes('hr compliance') && lowerName.includes('tracker')) {
    return 'Tracking HR compliance, monitoring regulations, ensuring adherence';
  }
  if (lowerName.includes('employee data') && lowerName.includes('manager')) {
    return 'Managing employee data, maintaining records, ensuring accuracy';
  }
  if (lowerName.includes('l&d curriculum') && lowerName.includes('designer')) {
    return 'Designing L&D curricula, planning learning, developing programs';
  }
  if (lowerName.includes('skill gap') && lowerName.includes('analyzer')) {
    return 'Analyzing skill gaps, identifying needs, planning training';
  }
  if (lowerName.includes('training effectiveness') && lowerName.includes('evaluator')) {
    return 'Evaluating training effectiveness, measuring impact, optimizing programs';
  }
  if (lowerName.includes('culture survey') && lowerName.includes('analyst')) {
    return 'Analyzing culture surveys, interpreting feedback, identifying trends';
  }
  if (lowerName.includes('engagement booster') && lowerName.includes('hr')) {
    return 'Boosting engagement, designing initiatives, improving morale';
  }
  if (lowerName.includes('values alignment') && lowerName.includes('checker')) {
    return 'Checking values alignment, assessing culture fit, ensuring consistency';
  }
  if (lowerName.includes('market compensation') && lowerName.includes('researcher')) {
    return 'Researching market compensation, benchmarking salaries, ensuring competitiveness';
  }
  if (lowerName.includes('pay equity') && lowerName.includes('auditor')) {
    return 'Auditing pay equity, ensuring fairness, identifying disparities';
  }
  if (lowerName.includes('incentive plan') && lowerName.includes('designer')) {
    return 'Designing incentive plans, creating compensation structures, motivating performance';
  }
  if (lowerName.includes('requisition prioritizer')) {
    return 'Prioritizing requisitions, managing hiring needs, optimizing recruitment';
  }
  if (lowerName.includes('recruiter performance') && lowerName.includes('tracker')) {
    return 'Tracking recruiter performance, measuring effectiveness, optimizing processes';
  }
  if (lowerName.includes('hiring budget') && lowerName.includes('manager')) {
    return 'Managing hiring budgets, controlling costs, optimizing spend';
  }
  if (lowerName.includes('candidate sourcer')) {
    return 'Sourcing candidates, finding talent, building pipelines';
  }
  if (lowerName.includes('interview scheduler') && lowerName.includes('recruiter')) {
    return 'Scheduling interviews, coordinating meetings, managing logistics';
  }
  if (lowerName.includes('reference checker') && lowerName.includes('recruiter')) {
    return 'Checking references, verifying backgrounds, assessing candidates';
  }
  if (lowerName.includes('benefits administrator') && lowerName.includes('hr')) {
    return 'Administering benefits, managing programs, supporting employees';
  }
  if (lowerName.includes('policy update') && lowerName.includes('communicator')) {
    return 'Communicating policy updates, informing employees, ensuring awareness';
  }
  if (lowerName.includes('hr ticket') && lowerName.includes('resolver')) {
    return 'Resolving HR tickets, answering questions, supporting employees';
  }
  if (lowerName.includes('course catalog') && lowerName.includes('curator')) {
    return 'Curating course catalogs, managing learning resources, recommending content';
  }
  if (lowerName.includes('certification tracker') && lowerName.includes('learning')) {
    return 'Tracking certifications, monitoring credentials, managing compliance';
  }
  if (lowerName.includes('mentorship matcher')) {
    return 'Matching mentorships, connecting mentors, facilitating learning';
  }
  if (lowerName.includes('salary benchmarking') && lowerName.includes('agent')) {
    return 'Benchmarking salaries, comparing markets, ensuring competitiveness';
  }
  if (lowerName.includes('bonus calculator') && lowerName.includes('compensation')) {
    return 'Calculating bonuses, determining incentives, managing compensation';
  }
  if (lowerName.includes('equity plan') && lowerName.includes('administrator')) {
    return 'Administering equity plans, managing stock options, tracking grants';
  }
  
  // Legal agents
  if (lowerName.includes('legal strategy') && lowerName.includes('clo')) {
    return 'Advising on legal strategy, managing risk, ensuring compliance';
  }
  if (lowerName.includes('regulatory change') && lowerName.includes('monitor')) {
    return 'Monitoring regulatory changes, tracking updates, assessing impact';
  }
  if (lowerName.includes('litigation risk') && lowerName.includes('assessor')) {
    return 'Assessing litigation risks, evaluating exposure, planning mitigation';
  }
  if (lowerName.includes('case portfolio') && lowerName.includes('manager')) {
    return 'Managing case portfolios, tracking matters, coordinating legal work';
  }
  if (lowerName.includes('outside counsel') && lowerName.includes('coordinator')) {
    return 'Coordinating outside counsel, managing relationships, controlling costs';
  }
  if (lowerName.includes('legal spend') && lowerName.includes('analyst')) {
    return 'Analyzing legal spend, tracking costs, optimizing budgets';
  }
  if (lowerName.includes('compliance program') && lowerName.includes('designer')) {
    return 'Designing compliance programs, creating frameworks, ensuring adherence';
  }
  if (lowerName.includes('regulatory scanner') && lowerName.includes('compliance')) {
    return 'Scanning regulations, monitoring changes, ensuring compliance';
  }
  if (lowerName.includes('compliance training') && lowerName.includes('coordinator')) {
    return 'Coordinating compliance training, educating staff, ensuring awareness';
  }
  if (lowerName.includes('contract lifecycle') && lowerName.includes('manager')) {
    return 'Managing contract lifecycles, tracking agreements, ensuring compliance';
  }
  if (lowerName.includes('template librarian') && lowerName.includes('contract')) {
    return 'Maintaining contract templates, managing libraries, ensuring consistency';
  }
  if (lowerName.includes('obligation tracker') && lowerName.includes('contract')) {
    return 'Tracking contract obligations, monitoring commitments, ensuring fulfillment';
  }
  if (lowerName.includes('ip portfolio') && lowerName.includes('manager')) {
    return 'Managing IP portfolios, tracking assets, protecting intellectual property';
  }
  if (lowerName.includes('patent filing') && lowerName.includes('coordinator')) {
    return 'Coordinating patent filings, managing applications, protecting inventions';
  }
  if (lowerName.includes('infringement monitor') && lowerName.includes('ip')) {
    return 'Monitoring infringement, protecting IP, enforcing rights';
  }
  if (lowerName.includes('board meeting') && lowerName.includes('coordinator')) {
    return 'Coordinating board meetings, managing logistics, ensuring smooth operations';
  }
  if (lowerName.includes('policy framework') && lowerName.includes('designer')) {
    return 'Designing policy frameworks, creating governance structures, ensuring compliance';
  }
  if (lowerName.includes('governance auditor') && lowerName.includes('vp')) {
    return 'Auditing governance, ensuring compliance, identifying risks';
  }
  if (lowerName.includes('audit scheduler') && lowerName.includes('compliance manager')) {
    return 'Scheduling audits, planning reviews, ensuring coverage';
  }
  if (lowerName.includes('compliance finding') && lowerName.includes('tracker')) {
    return 'Tracking compliance findings, monitoring issues, ensuring resolution';
  }
  if (lowerName.includes('corrective action') && lowerName.includes('monitor')) {
    return 'Monitoring corrective actions, tracking progress, ensuring completion';
  }
  if (lowerName.includes('precedent finder') && lowerName.includes('legal research')) {
    return 'Finding precedents, researching case law, supporting legal arguments';
  }
  if (lowerName.includes('statute analyzer') && lowerName.includes('legal research')) {
    return 'Analyzing statutes, interpreting laws, ensuring compliance';
  }
  if (lowerName.includes('case law') && lowerName.includes('summarizer')) {
    return 'Summarizing case law, extracting insights, supporting research';
  }
  if (lowerName.includes('clause librarian') && lowerName.includes('contract specialist')) {
    return 'Maintaining clause libraries, managing contract language, ensuring consistency';
  }
  if (lowerName.includes('risk spotter') && lowerName.includes('contract')) {
    return 'Spotting contract risks, identifying issues, mitigating exposure';
  }
  if (lowerName.includes('amendment drafter') && lowerName.includes('contract')) {
    return 'Drafting amendments, modifying contracts, managing changes';
  }
  if (lowerName.includes('regulation interpreter') && lowerName.includes('compliance analyst')) {
    return 'Interpreting regulations, explaining requirements, ensuring compliance';
  }
  if (lowerName.includes('gap assessor') && lowerName.includes('compliance')) {
    return 'Assessing compliance gaps, identifying deficiencies, planning remediation';
  }
  if (lowerName.includes('evidence collector') && lowerName.includes('compliance')) {
    return 'Collecting evidence, documenting compliance, supporting audits';
  }
  
  // Data & AI agents
  if (lowerName.includes('data strategy') && lowerName.includes('cdao')) {
    return 'Advising on data strategy, planning data initiatives, aligning with business';
  }
  if (lowerName.includes('ai governance') && lowerName.includes('enforcer')) {
    return 'Enforcing AI governance, ensuring responsible use, managing risks';
  }
  if (lowerName.includes('data monetization') && lowerName.includes('planner')) {
    return 'Planning data monetization, identifying opportunities, creating value';
  }
  if (lowerName.includes('research direction') && lowerName.includes('setter')) {
    return 'Setting research direction, defining priorities, guiding data science';
  }
  if (lowerName.includes('model validation') && lowerName.includes('overseer')) {
    return 'Overseeing model validation, ensuring quality, managing risks';
  }
  if (lowerName.includes('publication coordinator') && lowerName.includes('data science')) {
    return 'Coordinating publications, managing research output, sharing knowledge';
  }
  if (lowerName.includes('pipeline architect') && lowerName.includes('data engineering')) {
    return 'Architecting data pipelines, designing infrastructure, ensuring scalability';
  }
  if (lowerName.includes('data platform') && lowerName.includes('planner')) {
    return 'Planning data platforms, designing infrastructure, managing resources';
  }
  if (lowerName.includes('data cost') && lowerName.includes('optimizer')) {
    return 'Optimizing data costs, managing spend, reducing waste';
  }
  if (lowerName.includes('analytics roadmap') && lowerName.includes('planner')) {
    return 'Planning analytics roadmaps, defining priorities, guiding initiatives';
  }
  if (lowerName.includes('insight delivery') && lowerName.includes('manager')) {
    return 'Managing insight delivery, communicating findings, driving action';
  }
  if (lowerName.includes('stakeholder communicator') && lowerName.includes('analytics')) {
    return 'Communicating with stakeholders, presenting insights, ensuring understanding';
  }
  if (lowerName.includes('dashboard architect') && lowerName.includes('bi')) {
    return 'Architecting dashboards, designing visualizations, enabling insights';
  }
  if (lowerName.includes('kpi definition') && lowerName.includes('specialist')) {
    return 'Defining KPIs, establishing metrics, setting targets';
  }
  if (lowerName.includes('report scheduler') && lowerName.includes('bi')) {
    return 'Scheduling reports, automating distribution, ensuring timely delivery';
  }
  if (lowerName.includes('data catalog') && lowerName.includes('curator')) {
    return 'Curating data catalogs, organizing metadata, enabling discovery';
  }
  if (lowerName.includes('metadata enforcer') && lowerName.includes('data manager')) {
    return 'Enforcing metadata standards, ensuring consistency, improving quality';
  }
  if (lowerName.includes('data lineage') && lowerName.includes('tracker')) {
    return 'Tracking data lineage, documenting flows, ensuring transparency';
  }
  if (lowerName.includes('analytics project') && lowerName.includes('coordinator')) {
    return 'Coordinating analytics projects, managing workloads, ensuring delivery';
  }
  if (lowerName.includes('priority planner') && lowerName.includes('analytics')) {
    return 'Planning analytics priorities, managing backlogs, optimizing resources';
  }
  if (lowerName.includes('quality reviewer') && lowerName.includes('analytics')) {
    return 'Reviewing analytics quality, ensuring accuracy, maintaining standards';
  }
  if (lowerName.includes('feature engineer') && lowerName.includes('data scientist')) {
    return 'Engineering features, creating variables, improving models';
  }
  if (lowerName.includes('experiment designer') && lowerName.includes('data scientist')) {
    return 'Designing experiments, testing hypotheses, validating models';
  }
  if (lowerName.includes('model tuner') && lowerName.includes('data scientist')) {
    return 'Tuning models, optimizing performance, improving accuracy';
  }
  if (lowerName.includes('query builder') && lowerName.includes('data analyst')) {
    return 'Building queries, extracting data, enabling analysis';
  }
  if (lowerName.includes('visualization creator') && lowerName.includes('data analyst')) {
    return 'Creating visualizations, presenting data, enabling insights';
  }
  if (lowerName.includes('anomaly detector') && lowerName.includes('data analyst')) {
    return 'Detecting anomalies, identifying outliers, flagging issues';
  }
  if (lowerName.includes('report builder') && lowerName.includes('bi developer')) {
    return 'Building reports, creating dashboards, delivering insights';
  }
  if (lowerName.includes('dashboard tester') && lowerName.includes('bi')) {
    return 'Testing dashboards, ensuring accuracy, validating data';
  }
  if (lowerName.includes('data connector') && lowerName.includes('builder')) {
    return 'Building data connectors, integrating systems, enabling data flow';
  }
  if (lowerName.includes('model deployer') && lowerName.includes('ml engineer')) {
    return 'Deploying models, managing production, ensuring reliability';
  }
  if (lowerName.includes('model performance') && lowerName.includes('ml engineer')) {
    return 'Monitoring model performance, tracking accuracy, optimizing models';
  }
  if (lowerName.includes('pipeline automator') && lowerName.includes('ml')) {
    return 'Automating ML pipelines, streamlining workflows, improving efficiency';
  }
  if (lowerName.includes('data quality') && lowerName.includes('scorer')) {
    return 'Scoring data quality, assessing accuracy, identifying issues';
  }
  if (lowerName.includes('standard enforcer') && lowerName.includes('data steward')) {
    return 'Enforcing data standards, ensuring consistency, maintaining quality';
  }
  if (lowerName.includes('issue resolver') && lowerName.includes('data steward')) {
    return 'Resolving data issues, fixing problems, ensuring quality';
  }
  if (lowerName.includes('advanced statistician') && lowerName.includes('analytics')) {
    return 'Applying advanced statistics, analyzing data, deriving insights';
  }
  if (lowerName.includes('segmentation expert') && lowerName.includes('analytics')) {
    return 'Segmenting data, identifying groups, enabling targeting';
  }
  if (lowerName.includes('forecast builder') && lowerName.includes('analytics')) {
    return 'Building forecasts, predicting outcomes, supporting planning';
  }
  
  // Product agents
  if (lowerName.includes('product roadmap') && lowerName.includes('planner')) {
    return 'Planning product roadmaps, defining direction, setting priorities';
  }
  if (lowerName.includes('feature prioritizer') && lowerName.includes('vp product')) {
    return 'Prioritizing features, managing backlogs, maximizing value';
  }
  if (lowerName.includes('market alignment') && lowerName.includes('checker')) {
    return 'Checking market alignment, ensuring fit, validating strategy';
  }
  if (lowerName.includes('competitive analyst') && lowerName.includes('product strategy')) {
    return 'Analyzing competition, tracking markets, identifying opportunities';
  }
  if (lowerName.includes('strategic opportunity') && lowerName.includes('scout')) {
    return 'Scouting strategic opportunities, identifying growth areas, evaluating potential';
  }
  if (lowerName.includes('vision communicator') && lowerName.includes('product')) {
    return 'Communicating product vision, inspiring teams, aligning stakeholders';
  }
  if (lowerName.includes('process standardizer') && lowerName.includes('product operations')) {
    return 'Standardizing processes, ensuring consistency, improving efficiency';
  }
  if (lowerName.includes('metric tracker') && lowerName.includes('product operations')) {
    return 'Tracking product metrics, monitoring performance, identifying trends';
  }
  if (lowerName.includes('cross-functional') && lowerName.includes('coordinator')) {
    return 'Coordinating cross-functional teams, facilitating collaboration, ensuring alignment';
  }
  if (lowerName.includes('backlog groomer') && lowerName.includes('product manager')) {
    return 'Grooming backlogs, prioritizing work, managing capacity';
  }
  if (lowerName.includes('sprint planner') && lowerName.includes('product manager')) {
    return 'Planning sprints, defining iterations, managing delivery';
  }
  if (lowerName.includes('story writer') && lowerName.includes('product owner')) {
    return 'Writing user stories, defining requirements, creating acceptance criteria';
  }
  if (lowerName.includes('acceptance criteria') && lowerName.includes('definer')) {
    return 'Defining acceptance criteria, specifying requirements, ensuring clarity';
  }
  if (lowerName.includes('sprint reviewer') && lowerName.includes('product owner')) {
    return 'Reviewing sprints, evaluating delivery, gathering feedback';
  }
  if (lowerName.includes('feature spec') && lowerName.includes('writer')) {
    return 'Writing feature specifications, defining requirements, documenting products';
  }
  if (lowerName.includes('user story') && lowerName.includes('mapper')) {
    return 'Mapping user stories, organizing requirements, planning development';
  }
  if (lowerName.includes('priority adjuster') && lowerName.includes('product')) {
    return 'Adjusting priorities, managing changes, optimizing value';
  }
  if (lowerName.includes('market researcher') && lowerName.includes('product analyst')) {
    return 'Researching markets, analyzing trends, identifying opportunities';
  }
  if (lowerName.includes('feature usage') && lowerName.includes('tracker')) {
    return 'Tracking feature usage, analyzing adoption, identifying popular features';
  }
  if (lowerName.includes('feedback aggregator') && lowerName.includes('product')) {
    return 'Aggregating feedback, collecting insights, identifying improvements';
  }
  if (lowerName.includes('interview scheduler') && lowerName.includes('ux researcher')) {
    return 'Scheduling user interviews, coordinating research, gathering insights';
  }
  if (lowerName.includes('usability test') && lowerName.includes('designer')) {
    return 'Designing usability tests, planning research, evaluating experiences';
  }
  if (lowerName.includes('insight synthesizer') && lowerName.includes('ux')) {
    return 'Synthesizing insights, analyzing research, extracting findings';
  }
  if (lowerName.includes('launch planner') && lowerName.includes('product marketer')) {
    return 'Planning product launches, coordinating go-to-market, ensuring success';
  }
  if (lowerName.includes('messaging crafter') && lowerName.includes('product')) {
    return 'Crafting messaging, defining positioning, communicating value';
  }
  if (lowerName.includes('competitive differentiator') && lowerName.includes('product')) {
    return 'Differentiating competitively, identifying advantages, positioning products';
  }
  if (lowerName.includes('release coordinator') && lowerName.includes('release manager')) {
    return 'Coordinating releases, managing deployments, ensuring smooth launches';
  }
  if (lowerName.includes('rollback planner') && lowerName.includes('release')) {
    return 'Planning rollbacks, preparing contingencies, managing risk';
  }
  if (lowerName.includes('change communicator') && lowerName.includes('release')) {
    return 'Communicating changes, informing stakeholders, managing expectations';
  }
  
  // Security agents
  if (lowerName.includes('security strategy') && lowerName.includes('ciso')) {
    return 'Advising on security strategy, planning defenses, managing risk';
  }
  if (lowerName.includes('risk appetite') && lowerName.includes('ciso')) {
    return 'Defining risk appetite, setting tolerance, guiding decisions';
  }
  if (lowerName.includes('board reporter') && lowerName.includes('ciso')) {
    return 'Reporting to board, communicating risk, ensuring oversight';
  }
  if (lowerName.includes('soc workflow') && lowerName.includes('optimizer')) {
    return 'Optimizing SOC workflows, improving efficiency, streamlining operations';
  }
  if (lowerName.includes('alert prioritizer') && lowerName.includes('security operations')) {
    return 'Prioritizing alerts, managing noise, focusing on critical issues';
  }
  if (lowerName.includes('incident escalation') && lowerName.includes('manager')) {
    return 'Managing incident escalations, coordinating responses, ensuring resolution';
  }
  if (lowerName.includes('threat landscape') && lowerName.includes('monitor')) {
    return 'Monitoring threat landscapes, tracking risks, identifying emerging threats';
  }
  if (lowerName.includes('cyber risk') && lowerName.includes('quantifier')) {
    return 'Quantifying cyber risks, assessing exposure, prioritizing defenses';
  }
  if (lowerName.includes('security architecture') && lowerName.includes('reviewer')) {
    return 'Reviewing security architecture, identifying vulnerabilities, ensuring robustness';
  }
  if (lowerName.includes('risk register') && lowerName.includes('manager')) {
    return 'Managing risk registers, tracking risks, ensuring mitigation';
  }
  if (lowerName.includes('policy drafter') && lowerName.includes('governance')) {
    return 'Drafting security policies, creating standards, ensuring compliance';
  }
  if (lowerName.includes('risk appetite') && lowerName.includes('monitor')) {
    return 'Monitoring risk appetite, tracking exposure, ensuring alignment';
  }
  if (lowerName.includes('privacy impact') && lowerName.includes('assessor')) {
    return 'Assessing privacy impacts, identifying risks, ensuring compliance';
  }
  if (lowerName.includes('data classification') && lowerName.includes('enforcer')) {
    return 'Enforcing data classification, protecting sensitive information, ensuring compliance';
  }
  if (lowerName.includes('consent manager') && lowerName.includes('privacy')) {
    return 'Managing consent, handling preferences, ensuring compliance';
  }
  if (lowerName.includes('security design') && lowerName.includes('reviewer')) {
    return 'Reviewing security designs, identifying vulnerabilities, ensuring robustness';
  }
  if (lowerName.includes('threat modeler') && lowerName.includes('architect')) {
    return 'Modeling threats, identifying risks, planning defenses';
  }
  if (lowerName.includes('control mapper') && lowerName.includes('security')) {
    return 'Mapping security controls, ensuring coverage, identifying gaps';
  }
  if (lowerName.includes('shift coordinator') && lowerName.includes('soc')) {
    return 'Coordinating SOC shifts, managing operations, ensuring coverage';
  }
  if (lowerName.includes('playbook author') && lowerName.includes('soc')) {
    return 'Authoring security playbooks, documenting procedures, ensuring knowledge transfer';
  }
  if (lowerName.includes('escalation path') && lowerName.includes('definer')) {
    return 'Defining escalation paths, establishing procedures, ensuring clarity';
  }
  if (lowerName.includes('log reviewer') && lowerName.includes('security analyst')) {
    return 'Reviewing logs, analyzing events, identifying threats';
  }
  if (lowerName.includes('alert triage') && lowerName.includes('agent')) {
    return 'Triaging alerts, assessing severity, prioritizing response';
  }
  if (lowerName.includes('ioc collector') && lowerName.includes('security')) {
    return 'Collecting IoCs, tracking indicators, identifying threats';
  }
  if (lowerName.includes('containment coordinator') && lowerName.includes('incident')) {
    return 'Coordinating containment, managing response, limiting damage';
  }
  if (lowerName.includes('evidence collector') && lowerName.includes('incident')) {
    return 'Collecting evidence, preserving data, supporting investigations';
  }
  if (lowerName.includes('timeline reconstructor') && lowerName.includes('incident')) {
    return 'Reconstructing timelines, analyzing events, understanding incidents';
  }
  if (lowerName.includes('framework mapper') && lowerName.includes('security compliance')) {
    return 'Mapping compliance frameworks, ensuring coverage, identifying gaps';
  }
  if (lowerName.includes('evidence gatherer') && lowerName.includes('compliance')) {
    return 'Gathering evidence, documenting compliance, supporting audits';
  }
  if (lowerName.includes('audit liaison') && lowerName.includes('security')) {
    return 'Liaising with auditors, coordinating reviews, ensuring compliance';
  }
  if (lowerName.includes('exploit researcher') && lowerName.includes('penetration')) {
    return 'Researching exploits, identifying vulnerabilities, testing defenses';
  }
  if (lowerName.includes('vulnerability reporter') && lowerName.includes('penetration')) {
    return 'Reporting vulnerabilities, documenting findings, recommending fixes';
  }
  if (lowerName.includes('remediation advisor') && lowerName.includes('penetration')) {
    return 'Advising on remediation, recommending fixes, prioritizing actions';
  }
  if (lowerName.includes('access reviewer') && lowerName.includes('identity')) {
    return 'Reviewing access, auditing permissions, ensuring least privilege';
  }
  if (lowerName.includes('role modeler') && lowerName.includes('identity')) {
    return 'Modeling roles, defining permissions, managing access';
  }
  if (lowerName.includes('privilege escalation') && lowerName.includes('monitor')) {
    return 'Monitoring privilege escalation, detecting abuse, preventing unauthorized access';
  }
  
  // Research & Innovation agents
  if (lowerName.includes('research agenda') && lowerName.includes('setter')) {
    return 'Setting research agendas, defining priorities, guiding investigations';
  }
  if (lowerName.includes('grant proposal') && lowerName.includes('writer')) {
    return 'Writing grant proposals, securing funding, supporting research';
  }
  if (lowerName.includes('publication planner') && lowerName.includes('research')) {
    return 'Planning publications, managing output, sharing knowledge';
  }
  if (lowerName.includes('innovation pipeline') && lowerName.includes('manager')) {
    return 'Managing innovation pipelines, tracking ideas, ensuring progression';
  }
  if (lowerName.includes('idea scorer') && lowerName.includes('innovation')) {
    return 'Scoring ideas, evaluating potential, prioritizing innovation';
  }
  if (lowerName.includes('prototype funder') && lowerName.includes('innovation')) {
    return 'Funding prototypes, allocating resources, supporting innovation';
  }
  if (lowerName.includes('lab resource') && lowerName.includes('allocator')) {
    return 'Allocating lab resources, managing equipment, optimizing utilization';
  }
  if (lowerName.includes('experiment tracker') && lowerName.includes('r&d')) {
    return 'Tracking experiments, managing research, ensuring documentation';
  }
  if (lowerName.includes('r&d budget') && lowerName.includes('controller')) {
    return 'Controlling R&D budgets, managing spend, optimizing resources';
  }
  if (lowerName.includes('literature review') && lowerName.includes('coordinator')) {
    return 'Coordinating literature reviews, researching topics, synthesizing knowledge';
  }
  if (lowerName.includes('peer review') && lowerName.includes('organizer')) {
    return 'Organizing peer reviews, managing feedback, ensuring quality';
  }
  if (lowerName.includes('research mentor') && lowerName.includes('lead')) {
    return 'Mentoring researchers, guiding investigations, developing talent';
  }
  if (lowerName.includes('hackathon organizer') && lowerName.includes('innovation')) {
    return 'Organizing hackathons, managing events, fostering innovation';
  }
  if (lowerName.includes('innovation workshop') && lowerName.includes('facilitator')) {
    return 'Facilitating innovation workshops, guiding ideation, generating ideas';
  }
  if (lowerName.includes('ip filing') && lowerName.includes('coordinator')) {
    return 'Coordinating IP filings, managing patents, protecting inventions';
  }
  if (lowerName.includes('hypothesis designer') && lowerName.includes('research scientist')) {
    return 'Designing hypotheses, planning experiments, conducting research';
  }
  if (lowerName.includes('experiment executor') && lowerName.includes('research scientist')) {
    return 'Executing experiments, conducting research, gathering data';
  }
  if (lowerName.includes('paper drafter') && lowerName.includes('research')) {
    return 'Drafting papers, writing research, publishing findings';
  }
  if (lowerName.includes('trend spotter') && lowerName.includes('innovation analyst')) {
    return 'Spotting trends, identifying opportunities, analyzing markets';
  }
  if (lowerName.includes('technology scout') && lowerName.includes('innovation')) {
    return 'Scouting technologies, evaluating innovations, identifying opportunities';
  }
  if (lowerName.includes('feasibility assessor') && lowerName.includes('innovation')) {
    return 'Assessing feasibility, evaluating viability, managing risk';
  }
  if (lowerName.includes('rapid prototyper') && lowerName.includes('prototype engineer')) {
    return 'Rapidly prototyping, building MVPs, testing concepts';
  }
  if (lowerName.includes('demo builder') && lowerName.includes('prototype')) {
    return 'Building demos, creating prototypes, showcasing concepts';
  }
  if (lowerName.includes('user feedback') && lowerName.includes('collector')) {
    return 'Collecting user feedback, gathering insights, iterating on designs';
  }
  if (lowerName.includes('prior art') && lowerName.includes('searcher')) {
    return 'Searching prior art, researching patents, ensuring novelty';
  }
  if (lowerName.includes('patent drafter') && lowerName.includes('researcher')) {
    return 'Drafting patents, documenting inventions, protecting IP';
  }
  if (lowerName.includes('filing tracker') && lowerName.includes('patent')) {
    return 'Tracking filings, managing applications, monitoring status';
  }
  
  // Administrative agents
  if (lowerName.includes('admin strategy') && lowerName.includes('cao')) {
    return 'Planning admin strategy, optimizing operations, reducing costs';
  }
  if (lowerName.includes('cost reduction') && lowerName.includes('analyst')) {
    return 'Analyzing costs, identifying savings, optimizing spend';
  }
  if (lowerName.includes('policy overseer') && lowerName.includes('admin')) {
    return 'Overseeing policies, ensuring compliance, maintaining standards';
  }
  if (lowerName.includes('process standardizer') && lowerName.includes('admin operations')) {
    return 'Standardizing processes, ensuring consistency, improving efficiency';
  }
  if (lowerName.includes('vendor manager') && lowerName.includes('admin')) {
    return 'Managing vendors, evaluating suppliers, optimizing relationships';
  }
  if (lowerName.includes('office budget') && lowerName.includes('controller')) {
    return 'Controlling office budgets, managing spend, optimizing resources';
  }
  if (lowerName.includes('space planner') && lowerName.includes('facilities')) {
    return 'Planning space, optimizing layouts, managing facilities';
  }
  if (lowerName.includes('safety compliance') && lowerName.includes('checker')) {
    return 'Checking safety compliance, ensuring adherence, managing risk';
  }
  if (lowerName.includes('task delegator') && lowerName.includes('admin manager')) {
    return 'Delegating tasks, managing workloads, optimizing productivity';
  }
  if (lowerName.includes('schedule coordinator') && lowerName.includes('admin')) {
    return 'Coordinating schedules, managing calendars, optimizing time';
  }
  if (lowerName.includes('inventory manager') && lowerName.includes('admin')) {
    return 'Managing inventory, tracking supplies, optimizing stock';
  }
  if (lowerName.includes('meeting room') && lowerName.includes('booker')) {
    return 'Booking meeting rooms, managing space, optimizing utilization';
  }
  if (lowerName.includes('supply orderer') && lowerName.includes('office')) {
    return 'Ordering supplies, managing inventory, ensuring availability';
  }
  if (lowerName.includes('visitor host') && lowerName.includes('office')) {
    return 'Hosting visitors, managing guests, ensuring positive experience';
  }
  if (lowerName.includes('calendar optimizer') && lowerName.includes('executive assistant')) {
    return 'Optimizing calendars, managing time, scheduling efficiently';
  }
  if (lowerName.includes('travel booker') && lowerName.includes('executive assistant')) {
    return 'Booking travel, managing itineraries, coordinating logistics';
  }
  if (lowerName.includes('correspondence drafter') && lowerName.includes('executive')) {
    return 'Drafting correspondence, writing communications, ensuring professionalism';
  }
  if (lowerName.includes('work order') && lowerName.includes('manager')) {
    return 'Managing work orders, coordinating maintenance, ensuring completion';
  }
  if (lowerName.includes('vendor liaison') && lowerName.includes('facilities')) {
    return 'Liaising with vendors, managing relationships, coordinating services';
  }
  if (lowerName.includes('inspection scheduler') && lowerName.includes('facilities')) {
    return 'Scheduling inspections, coordinating assessments, ensuring compliance';
  }
  if (lowerName.includes('itinerary planner') && lowerName.includes('travel')) {
    return 'Planning itineraries, organizing travel, managing logistics';
  }
  if (lowerName.includes('expense reporter') && lowerName.includes('travel')) {
    return 'Reporting expenses, managing receipts, ensuring accuracy';
  }
  if (lowerName.includes('visa documenter') && lowerName.includes('travel')) {
    return 'Documenting visas, managing travel documents, ensuring compliance';
  }
  if (lowerName.includes('version manager') && lowerName.includes('document')) {
    return 'Managing versions, tracking changes, maintaining history';
  }
  if (lowerName.includes('archive organizer') && lowerName.includes('document')) {
    return 'Organizing archives, managing documents, ensuring accessibility';
  }
  if (lowerName.includes('access controller') && lowerName.includes('document')) {
    return 'Controlling access, managing permissions, ensuring security';
  }
  
  // Investment & Trading agents
  if (lowerName.includes('investment strategy') && lowerName.includes('cio')) {
    return 'Advising on investment strategy, allocating capital, optimizing portfolios';
  }
  if (lowerName.includes('portfolio allocation') && lowerName.includes('director')) {
    return 'Directing portfolio allocation, optimizing investments, managing risk';
  }
  if (lowerName.includes('market outlook') && lowerName.includes('analyst')) {
    return 'Analyzing market outlooks, forecasting trends, identifying opportunities';
  }
  if (lowerName.includes('trading strategy') && lowerName.includes('validator')) {
    return 'Validating trading strategies, testing approaches, ensuring effectiveness';
  }
  if (lowerName.includes('desk performance') && lowerName.includes('monitor')) {
    return 'Monitoring desk performance, tracking metrics, identifying improvements';
  }
  if (lowerName.includes('risk limit') && lowerName.includes('enforcer')) {
    return 'Enforcing risk limits, managing exposure, preventing losses';
  }
  if (lowerName.includes('investment committee') && lowerName.includes('coordinator')) {
    return 'Coordinating investment committees, managing decisions, ensuring governance';
  }
  if (lowerName.includes('deal flow') && lowerName.includes('manager')) {
    return 'Managing deal flow, evaluating opportunities, optimizing investments';
  }
  if (lowerName.includes('diligence overseer') && lowerName.includes('investments')) {
    return 'Overseeing due diligence, evaluating risks, ensuring quality';
  }
  if (lowerName.includes('order flow') && lowerName.includes('optimizer')) {
    return 'Optimizing order flow, improving execution, reducing costs';
  }
  if (lowerName.includes('trader performance') && lowerName.includes('evaluator')) {
    return 'Evaluating trader performance, tracking metrics, identifying improvements';
  }
  if (lowerName.includes('market open') && lowerName.includes('closing')) {
    return 'Coordinating market opens/closings, managing transitions, ensuring smooth operations';
  }
  if (lowerName.includes('asset allocator') && lowerName.includes('portfolio')) {
    return 'Allocating assets, optimizing portfolios, managing diversification';
  }
  if (lowerName.includes('rebalancing scheduler') && lowerName.includes('portfolio')) {
    return 'Scheduling rebalancing, optimizing portfolios, managing risk';
  }
  if (lowerName.includes('performance attribution') && lowerName.includes('analyst')) {
    return 'Analyzing performance attribution, understanding returns, optimizing strategies';
  }
  if (lowerName.includes('var calculator') && lowerName.includes('trading risk')) {
    return 'Calculating VaR, measuring risk, managing exposure';
  }
  if (lowerName.includes('stress test') && lowerName.includes('designer')) {
    return 'Designing stress tests, simulating scenarios, assessing resilience';
  }
  if (lowerName.includes('limit breach') && lowerName.includes('alerter')) {
    return 'Alerting limit breaches, monitoring risk, taking action';
  }
  if (lowerName.includes('order executor') && lowerName.includes('equity trader')) {
    return 'Executing orders, managing trades, optimizing execution';
  }
  if (lowerName.includes('market depth') && lowerName.includes('analyzer')) {
    return 'Analyzing market depth, assessing liquidity, optimizing trades';
  }
  if (lowerName.includes('execution quality') && lowerName.includes('reporter')) {
    return 'Reporting execution quality, measuring performance, optimizing trading';
  }
  if (lowerName.includes('currency pair') && lowerName.includes('analyzer')) {
    return 'Analyzing currency pairs, assessing FX markets, optimizing trades';
  }
  if (lowerName.includes('fx hedging') && lowerName.includes('coordinator')) {
    return 'Coordinating FX hedging, managing currency risk, protecting value';
  }
  if (lowerName.includes('cross-border payment') && lowerName.includes('optimizer')) {
    return 'Optimizing cross-border payments, reducing costs, improving efficiency';
  }
  if (lowerName.includes('on-chain') && lowerName.includes('analyzer')) {
    return 'Analyzing on-chain data, monitoring blockchain, identifying opportunities';
  }
  if (lowerName.includes('liquidity pool') && lowerName.includes('monitor')) {
    return 'Monitoring liquidity pools, assessing DeFi markets, optimizing trades';
  }
  if (lowerName.includes('wallet security') && lowerName.includes('checker')) {
    return 'Checking wallet security, assessing risks, protecting assets';
  }
  if (lowerName.includes('options pricer') && lowerName.includes('derivatives')) {
    return 'Pricing options, valuing derivatives, managing risk';
  }
  if (lowerName.includes('greeks calculator') && lowerName.includes('derivatives')) {
    return 'Calculating Greeks, measuring sensitivity, managing risk';
  }
  if (lowerName.includes('volatility surface') && lowerName.includes('mapper')) {
    return 'Mapping volatility surfaces, analyzing options, pricing derivatives';
  }
  if (lowerName.includes('sector analyzer') && lowerName.includes('portfolio')) {
    return 'Analyzing sectors, assessing performance, optimizing allocation';
  }
  if (lowerName.includes('factor modeler') && lowerName.includes('portfolio')) {
    return 'Modeling factors, analyzing drivers, understanding returns';
  }
  if (lowerName.includes('benchmark comparator') && lowerName.includes('portfolio')) {
    return 'Comparing benchmarks, evaluating performance, identifying alpha';
  }
  if (lowerName.includes('scenario modeler') && lowerName.includes('trading risk')) {
    return 'Modeling scenarios, assessing risk, planning contingencies';
  }
  if (lowerName.includes('correlation tracker') && lowerName.includes('trading risk')) {
    return 'Tracking correlations, analyzing relationships, managing portfolio risk';
  }
  if (lowerName.includes('tail risk') && lowerName.includes('assessor')) {
    return 'Assessing tail risk, measuring extreme events, managing exposure';
  }
  if (lowerName.includes('trade surveillance') && lowerName.includes('agent')) {
    return 'Surveilling trades, monitoring compliance, detecting violations';
  }
  if (lowerName.includes('regulatory reporter') && lowerName.includes('trading')) {
    return 'Reporting to regulators, ensuring compliance, managing disclosures';
  }
  if (lowerName.includes('restricted list') && lowerName.includes('monitor')) {
    return 'Monitoring restricted lists, ensuring compliance, preventing violations';
  }
  if (lowerName.includes('alpha researcher') && lowerName.includes('quantitative')) {
    return 'Researching alpha, identifying opportunities, generating signals';
  }
  if (lowerName.includes('backtest engine') && lowerName.includes('quantitative')) {
    return 'Running backtests, validating strategies, measuring performance';
  }
  if (lowerName.includes('signal generator') && lowerName.includes('quantitative')) {
    return 'Generating signals, identifying opportunities, guiding trades';
  }
  if (lowerName.includes('esg data') && lowerName.includes('collector')) {
    return 'Collecting ESG data, measuring sustainability, assessing impact';
  }
  if (lowerName.includes('sustainability scorer') && lowerName.includes('esg')) {
    return 'Scoring sustainability, measuring ESG performance, assessing impact';
  }
  if (lowerName.includes('impact reporter') && lowerName.includes('esg')) {
    return 'Reporting ESG impact, communicating sustainability, measuring outcomes';
  }
  if (lowerName.includes('economic indicator') && lowerName.includes('tracker')) {
    return 'Tracking economic indicators, monitoring macro trends, informing decisions';
  }
  if (lowerName.includes('central bank') && lowerName.includes('watcher')) {
    return 'Watching central banks, monitoring policy, anticipating changes';
  }
  if (lowerName.includes('geopolitical risk') && lowerName.includes('assessor')) {
    return 'Assessing geopolitical risks, monitoring events, managing exposure';
  }
  if (lowerName.includes('strategy coder') && lowerName.includes('algo trading')) {
    return 'Coding trading strategies, implementing algorithms, automating trades';
  }
  if (lowerName.includes('latency optimizer') && lowerName.includes('algo')) {
    return 'Optimizing latency, improving speed, reducing delays';
  }
  if (lowerName.includes('execution algorithm') && lowerName.includes('tester')) {
    return 'Testing execution algorithms, validating performance, optimizing trading';
  }
  if (lowerName.includes('trade reconciler') && lowerName.includes('settlement')) {
    return 'Reconciling trades, matching records, ensuring accuracy';
  }
  if (lowerName.includes('clearing coordinator') && lowerName.includes('settlement')) {
    return 'Coordinating clearing, managing settlements, ensuring completion';
  }
  if (lowerName.includes('fail manager') && lowerName.includes('settlement')) {
    return 'Managing fails, resolving issues, ensuring settlement';
  }
  
  // Real Estate agents
  if (lowerName.includes('portfolio strategy') && lowerName.includes('creo')) {
    return 'Advising on portfolio strategy, optimizing real estate investments, managing risk';
  }
  if (lowerName.includes('market cycle') && lowerName.includes('analyst')) {
    return 'Analyzing market cycles, timing investments, identifying opportunities';
  }
  if (lowerName.includes('capital deployment') && lowerName.includes('planner')) {
    return 'Planning capital deployment, allocating resources, optimizing investments';
  }
  if (lowerName.includes('property performance') && lowerName.includes('monitor')) {
    return 'Monitoring property performance, tracking metrics, identifying improvements';
  }
  if (lowerName.includes('noi optimizer') && lowerName.includes('property')) {
    return 'Optimizing NOI, maximizing income, reducing expenses';
  }
  if (lowerName.includes('tenant retention') && lowerName.includes('strategist')) {
    return 'Strategizing tenant retention, reducing turnover, maximizing occupancy';
  }
  if (lowerName.includes('development pipeline') && lowerName.includes('manager')) {
    return 'Managing development pipelines, tracking projects, ensuring delivery';
  }
  if (lowerName.includes('feasibility analyst') && lowerName.includes('real estate')) {
    return 'Analyzing feasibility, assessing projects, evaluating returns';
  }
  if (lowerName.includes('permit tracker') && lowerName.includes('development')) {
    return 'Tracking permits, managing approvals, ensuring compliance';
  }
  if (lowerName.includes('rent collector') && lowerName.includes('property')) {
    return 'Collecting rent, managing income, ensuring payment';
  }
  if (lowerName.includes('maintenance dispatcher') && lowerName.includes('property')) {
    return 'Dispatching maintenance, coordinating repairs, ensuring property condition';
  }
  if (lowerName.includes('lease enforcer') && lowerName.includes('property')) {
    return 'Enforcing leases, ensuring compliance, managing tenant relationships';
  }
  if (lowerName.includes('vacancy minimizer') && lowerName.includes('leasing')) {
    return 'Minimizing vacancies, filling units, maximizing occupancy';
  }
  if (lowerName.includes('lease negotiator') && lowerName.includes('leasing')) {
    return 'Negotiating leases, structuring deals, optimizing terms';
  }
  if (lowerName.includes('tenant qualifier') && lowerName.includes('leasing')) {
    return 'Qualifying tenants, screening applicants, reducing risk';
  }
  if (lowerName.includes('building systems') && lowerName.includes('monitor')) {
    return 'Monitoring building systems, ensuring operation, optimizing performance';
  }
  if (lowerName.includes('energy manager') && lowerName.includes('facilities')) {
    return 'Managing energy, reducing consumption, optimizing costs';
  }
  if (lowerName.includes('space optimizer') && lowerName.includes('facilities')) {
    return 'Optimizing space, maximizing utilization, improving efficiency';
  }
  if (lowerName.includes('comparable analyzer') && lowerName.includes('property')) {
    return 'Analyzing comparables, valuing properties, assessing market';
  }
  if (lowerName.includes('value estimator') && lowerName.includes('property')) {
    return 'Estimating values, appraising properties, assessing worth';
  }
  if (lowerName.includes('market trend') && lowerName.includes('reporter')) {
    return 'Reporting market trends, analyzing conditions, identifying opportunities';
  }
  if (lowerName.includes('lease abstractor') && lowerName.includes('administrator')) {
    return 'Abstracting leases, summarizing terms, managing documentation';
  }
  if (lowerName.includes('critical date') && lowerName.includes('tracker')) {
    return 'Tracking critical dates, managing deadlines, ensuring compliance';
  }
  if (lowerName.includes('rent escalation') && lowerName.includes('calculator')) {
    return 'Calculating rent escalations, managing increases, ensuring accuracy';
  }
  if (lowerName.includes('issue resolver') && lowerName.includes('tenant relations')) {
    return 'Resolving tenant issues, managing complaints, ensuring satisfaction';
  }
  if (lowerName.includes('communication coordinator') && lowerName.includes('tenant')) {
    return 'Coordinating communications, informing tenants, managing relationships';
  }
  if (lowerName.includes('satisfaction surveyor') && lowerName.includes('tenant')) {
    return 'Surveying satisfaction, gathering feedback, improving service';
  }
  if (lowerName.includes('work order') && lowerName.includes('prioritizer')) {
    return 'Prioritizing work orders, managing maintenance, ensuring timely completion';
  }
  if (lowerName.includes('vendor dispatcher') && lowerName.includes('maintenance')) {
    return 'Dispatching vendors, coordinating services, ensuring quality';
  }
  if (lowerName.includes('cost estimator') && lowerName.includes('maintenance')) {
    return 'Estimating costs, budgeting repairs, managing spend';
  }
  if (lowerName.includes('deal screener') && lowerName.includes('acquisition')) {
    return 'Screening deals, evaluating opportunities, filtering investments';
  }
  if (lowerName.includes('due diligence') && lowerName.includes('coordinator')) {
    return 'Coordinating due diligence, managing investigations, assessing risk';
  }
  if (lowerName.includes('underwriting assistant') && lowerName.includes('acquisition')) {
    return 'Assisting underwriting, analyzing deals, supporting decisions';
  }
  if (lowerName.includes('asset performance') && lowerName.includes('tracker')) {
    return 'Tracking asset performance, monitoring returns, identifying improvements';
  }
  if (lowerName.includes('disposition advisor') && lowerName.includes('asset')) {
    return 'Advising dispositions, timing sales, optimizing returns';
  }
  if (lowerName.includes('return calculator') && lowerName.includes('asset')) {
    return 'Calculating returns, measuring performance, evaluating investments';
  }
  if (lowerName.includes('timeline manager') && lowerName.includes('development')) {
    return 'Managing timelines, tracking progress, ensuring delivery';
  }
  if (lowerName.includes('contractor coordinator') && lowerName.includes('development')) {
    return 'Coordinating contractors, managing construction, ensuring quality';
  }
  if (lowerName.includes('budget tracker') && lowerName.includes('development')) {
    return 'Tracking budgets, managing costs, controlling spend';
  }
  if (lowerName.includes('listing creator') && lowerName.includes('property marketing')) {
    return 'Creating listings, marketing properties, attracting buyers';
  }
  if (lowerName.includes('virtual tour') && lowerName.includes('builder')) {
    return 'Building virtual tours, showcasing properties, enhancing marketing';
  }
  if (lowerName.includes('lead qualifier') && lowerName.includes('property marketing')) {
    return 'Qualifying leads, screening prospects, optimizing conversion';
  }
  
  // Insurance agents
  if (lowerName.includes('enterprise risk') && lowerName.includes('cro')) {
    return 'Managing enterprise risk, developing strategies, protecting organization';
  }
  if (lowerName.includes('risk appetite') && lowerName.includes('definer')) {
    return 'Defining risk appetite, setting tolerance, guiding decisions';
  }
  if (lowerName.includes('board risk') && lowerName.includes('reporter')) {
    return 'Reporting risk to board, communicating exposure, ensuring oversight';
  }
  if (lowerName.includes('underwriting guidelines') && lowerName.includes('enforcer')) {
    return 'Enforcing underwriting guidelines, ensuring compliance, maintaining standards';
  }
  if (lowerName.includes('portfolio mix') && lowerName.includes('manager')) {
    return 'Managing portfolio mix, optimizing risk, balancing exposure';
  }
  if (lowerName.includes('pricing strategy') && lowerName.includes('advisor')) {
    return 'Advising on pricing strategy, optimizing rates, ensuring competitiveness';
  }
  if (lowerName.includes('claims process') && lowerName.includes('optimizer')) {
    return 'Optimizing claims processes, improving efficiency, reducing costs';
  }
  if (lowerName.includes('settlement authority') && lowerName.includes('manager')) {
    return 'Managing settlement authority, approving payments, controlling exposure';
  }
  if (lowerName.includes('litigation coordinator') && lowerName.includes('claims')) {
    return 'Coordinating litigation, managing legal matters, controlling costs';
  }
  if (lowerName.includes('risk model') && lowerName.includes('overseer')) {
    return 'Overseeing risk models, ensuring accuracy, managing validation';
  }
  if (lowerName.includes('assessment standards') && lowerName.includes('enforcer')) {
    return 'Enforcing assessment standards, ensuring consistency, maintaining quality';
  }
  if (lowerName.includes('emerging risk') && lowerName.includes('spotter')) {
    return 'Spotting emerging risks, identifying threats, planning mitigation';
  }
  if (lowerName.includes('workflow prioritizer') && lowerName.includes('underwriting')) {
    return 'Prioritizing underwriting workflows, managing capacity, optimizing efficiency';
  }
  if (lowerName.includes('quality reviewer') && lowerName.includes('underwriting')) {
    return 'Reviewing underwriting quality, ensuring accuracy, maintaining standards';
  }
  if (lowerName.includes('exception approver') && lowerName.includes('underwriting')) {
    return 'Approving exceptions, managing deviations, ensuring compliance';
  }
  if (lowerName.includes('claims assigner') && lowerName.includes('manager')) {
    return 'Assigning claims, routing work, optimizing distribution';
  }
  if (lowerName.includes('reserve reviewer') && lowerName.includes('claims')) {
    return 'Reviewing reserves, assessing adequacy, managing exposure';
  }
  if (lowerName.includes('fraud flag') && lowerName.includes('coordinator')) {
    return 'Coordinating fraud flags, detecting suspicious activity, preventing losses';
  }
  if (lowerName.includes('policy lifecycle') && lowerName.includes('manager')) {
    return 'Managing policy lifecycles, tracking policies, ensuring compliance';
  }
  if (lowerName.includes('renewal tracker') && lowerName.includes('policy')) {
    return 'Tracking renewals, managing expirations, ensuring continuity';
  }
  if (lowerName.includes('endorsement processor') && lowerName.includes('policy')) {
    return 'Processing endorsements, managing changes, updating policies';
  }
  if (lowerName.includes('risk evaluator') && lowerName.includes('underwriter')) {
    return 'Evaluating risks, assessing exposure, determining premiums';
  }
  if (lowerName.includes('premium calculator') && lowerName.includes('underwriter')) {
    return 'Calculating premiums, pricing policies, ensuring profitability';
  }
  if (lowerName.includes('coverage analyzer') && lowerName.includes('underwriter')) {
    return 'Analyzing coverage, assessing needs, ensuring adequacy';
  }
  if (lowerName.includes('damage assessor') && lowerName.includes('claims adjuster')) {
    return 'Assessing damage, evaluating losses, determining payouts';
  }
  if (lowerName.includes('liability determiner') && lowerName.includes('claims')) {
    return 'Determining liability, assessing responsibility, managing claims';
  }
  if (lowerName.includes('settlement negotiator') && lowerName.includes('claims')) {
    return 'Negotiating settlements, resolving claims, managing costs';
  }
  if (lowerName.includes('pattern detector') && lowerName.includes('fraud')) {
    return 'Detecting fraud patterns, identifying suspicious activity, preventing losses';
  }
  if (lowerName.includes('anomaly scorer') && lowerName.includes('fraud')) {
    return 'Scoring anomalies, flagging suspicious activity, investigating fraud';
  }
  if (lowerName.includes('investigation coordinator') && lowerName.includes('fraud')) {
    return 'Coordinating investigations, gathering evidence, resolving fraud';
  }
  if (lowerName.includes('loss development') && lowerName.includes('tracker')) {
    return 'Tracking loss development, analyzing trends, reserving accurately';
  }
  if (lowerName.includes('frequency/severity') && lowerName.includes('modeler')) {
    return 'Modeling frequency and severity, predicting losses, pricing risk';
  }
  if (lowerName.includes('rate filing') && lowerName.includes('preparer')) {
    return 'Preparing rate filings, submitting to regulators, ensuring compliance';
  }
  if (lowerName.includes('scenario builder') && lowerName.includes('risk modeler')) {
    return 'Building scenarios, modeling risks, assessing exposure';
  }
  if (lowerName.includes('correlation analyst') && lowerName.includes('risk')) {
    return 'Analyzing correlations, understanding dependencies, managing portfolio risk';
  }
  if (lowerName.includes('capital requirement') && lowerName.includes('calculator')) {
    return 'Calculating capital requirements, ensuring solvency, managing reserves';
  }
  if (lowerName.includes('policy issuer') && lowerName.includes('administrator')) {
    return 'Issuing policies, creating contracts, ensuring accuracy';
  }
  if (lowerName.includes('document generator') && lowerName.includes('policy')) {
    return 'Generating documents, creating policies, ensuring quality';
  }
  if (lowerName.includes('compliance checker') && lowerName.includes('policy')) {
    return 'Checking compliance, ensuring adherence, maintaining standards';
  }
  if (lowerName.includes('risk profiler') && lowerName.includes('customer')) {
    return 'Profiling customer risk, assessing exposure, pricing appropriately';
  }
  if (lowerName.includes('behavioral scorer') && lowerName.includes('customer risk')) {
    return 'Scoring behavior, assessing risk, predicting losses';
  }
  if (lowerName.includes('segmentation analyst') && lowerName.includes('customer risk')) {
    return 'Segmenting customers, analyzing risk, optimizing pricing';
  }
  if (lowerName.includes('event simulator') && lowerName.includes('catastrophe')) {
    return 'Simulating catastrophic events, modeling losses, assessing exposure';
  }
  if (lowerName.includes('exposure aggregator') && lowerName.includes('catastrophe')) {
    return 'Aggregating exposure, analyzing concentration, managing risk';
  }
  if (lowerName.includes('loss estimator') && lowerName.includes('catastrophe')) {
    return 'Estimating catastrophic losses, assessing impact, planning contingencies';
  }
  if (lowerName.includes('treaty negotiator') && lowerName.includes('reinsurance')) {
    return 'Negotiating reinsurance treaties, managing transfers, optimizing protection';
  }
  if (lowerName.includes('ceding calculator') && lowerName.includes('reinsurance')) {
    return 'Calculating ceding, managing transfers, optimizing reinsurance';
  }
  if (lowerName.includes('recoveries tracker') && lowerName.includes('reinsurance')) {
    return 'Tracking recoveries, managing claims, optimizing collections';
  }
  
  // Healthcare agents
  if (lowerName.includes('clinical strategy') && lowerName.includes('cmo')) {
    return 'Advising on clinical strategy, improving patient care, ensuring quality';
  }
  if (lowerName.includes('quality standards') && lowerName.includes('cmo')) {
    return 'Enforcing quality standards, ensuring compliance, maintaining excellence';
  }
  if (lowerName.includes('medical policy') && lowerName.includes('reviewer')) {
    return 'Reviewing medical policies, ensuring compliance, maintaining standards';
  }
  if (lowerName.includes('workflow optimizer') && lowerName.includes('healthcare operations')) {
    return 'Optimizing healthcare workflows, improving efficiency, reducing wait times';
  }
  if (lowerName.includes('staff scheduler') && lowerName.includes('healthcare')) {
    return 'Scheduling healthcare staff, managing shifts, ensuring coverage';
  }
  if (lowerName.includes('regulatory compliance') && lowerName.includes('healthcare')) {
    return 'Monitoring regulatory compliance, ensuring adherence, managing risk';
  }
  if (lowerName.includes('satisfaction analyzer') && lowerName.includes('patient experience')) {
    return 'Analyzing patient satisfaction, measuring experience, identifying improvements';
  }
  if (lowerName.includes('service improvement') && lowerName.includes('planner')) {
    return 'Planning service improvements, enhancing patient care, optimizing delivery';
  }
  if (lowerName.includes('feedback coordinator') && lowerName.includes('patient')) {
    return 'Coordinating patient feedback, gathering insights, driving improvements';
  }
  if (lowerName.includes('intake coordinator') && lowerName.includes('patient services')) {
    return 'Coordinating patient intake, managing admissions, ensuring smooth onboarding';
  }
  if (lowerName.includes('service navigator') && lowerName.includes('patient')) {
    return 'Navigating patient services, guiding patients, ensuring access to care';
  }
  if (lowerName.includes('discharge planner') && lowerName.includes('patient services')) {
    return 'Planning discharges, coordinating transitions, ensuring continuity of care';
  }
  if (lowerName.includes('claims optimizer') && lowerName.includes('medical billing')) {
    return 'Optimizing medical claims, maximizing reimbursement, reducing denials';
  }
  if (lowerName.includes('denial manager') && lowerName.includes('medical billing')) {
    return 'Managing claim denials, resolving issues, improving revenue';
  }
  if (lowerName.includes('revenue cycle') && lowerName.includes('analyst')) {
    return 'Analyzing revenue cycles, identifying bottlenecks, optimizing cash flow';
  }
  if (lowerName.includes('appointment optimizer') && lowerName.includes('scheduling')) {
    return 'Optimizing appointments, reducing no-shows, maximizing utilization';
  }
  if (lowerName.includes('no-show predictor') && lowerName.includes('scheduling')) {
    return 'Predicting no-shows, managing schedules, optimizing capacity';
  }
  if (lowerName.includes('provider calendar') && lowerName.includes('manager')) {
    return 'Managing provider calendars, scheduling appointments, optimizing availability';
  }
  if (lowerName.includes('referral processor') && lowerName.includes('patient coordinator')) {
    return 'Processing referrals, coordinating care, ensuring timely appointments';
  }
  if (lowerName.includes('pre-authorization') && lowerName.includes('agent')) {
    return 'Handling pre-authorizations, managing approvals, ensuring coverage';
  }
  if (lowerName.includes('care transition') && lowerName.includes('coordinator')) {
    return 'Coordinating care transitions, ensuring continuity, managing handoffs';
  }
  if (lowerName.includes('code assigner') && lowerName.includes('medical coder')) {
    return 'Assigning medical codes, ensuring accuracy, maximizing reimbursement';
  }
  if (lowerName.includes('coding compliance') && lowerName.includes('auditor')) {
    return 'Auditing coding compliance, ensuring accuracy, preventing errors';
  }
  if (lowerName.includes('coding update') && lowerName.includes('tracker')) {
    return 'Tracking coding updates, maintaining currency, ensuring compliance';
  }
  if (lowerName.includes('charge capture') && lowerName.includes('billing specialist')) {
    return 'Capturing charges, ensuring accuracy, maximizing revenue';
  }
  if (lowerName.includes('payment poster') && lowerName.includes('billing')) {
    return 'Posting payments, reconciling accounts, managing balances';
  }
  if (lowerName.includes('balance collector') && lowerName.includes('billing')) {
    return 'Collecting balances, managing accounts receivable, improving cash flow';
  }
  if (lowerName.includes('care plan') && lowerName.includes('manager')) {
    return 'Managing care plans, coordinating treatment, ensuring quality';
  }
  if (lowerName.includes('follow-up scheduler') && lowerName.includes('care')) {
    return 'Scheduling follow-ups, monitoring patients, ensuring continuity';
  }
  if (lowerName.includes('outcome tracker') && lowerName.includes('care')) {
    return 'Tracking outcomes, measuring quality, identifying improvements';
  }
  if (lowerName.includes('record organizer') && lowerName.includes('health records')) {
    return 'Organizing health records, maintaining documentation, ensuring accessibility';
  }
  if (lowerName.includes('release manager') && lowerName.includes('health records')) {
    return 'Managing record releases, ensuring privacy, handling requests';
  }
  if (lowerName.includes('data integrity') && lowerName.includes('checker')) {
    return 'Checking data integrity, ensuring accuracy, maintaining quality';
  }
  if (lowerName.includes('virtual visit') && lowerName.includes('facilitator')) {
    return 'Facilitating virtual visits, managing telehealth, ensuring quality';
  }
  if (lowerName.includes('tech troubleshooter') && lowerName.includes('telehealth')) {
    return 'Troubleshooting telehealth tech, supporting patients, ensuring access';
  }
  if (lowerName.includes('remote monitor') && lowerName.includes('telehealth')) {
    return 'Monitoring remote patients, tracking vitals, ensuring safety';
  }
  if (lowerName.includes('regulation tracker') && lowerName.includes('healthcare compliance')) {
    return 'Tracking healthcare regulations, ensuring compliance, managing risk';
  }
  if (lowerName.includes('audit preparer') && lowerName.includes('healthcare')) {
    return 'Preparing for audits, ensuring compliance, managing documentation';
  }
  if (lowerName.includes('compliance training') && lowerName.includes('coordinator')) {
    return 'Coordinating compliance training, educating staff, ensuring awareness';
  }
  if (lowerName.includes('metric analyzer') && lowerName.includes('quality improvement')) {
    return 'Analyzing quality metrics, measuring performance, identifying improvements';
  }
  if (lowerName.includes('improvement planner') && lowerName.includes('quality')) {
    return 'Planning quality improvements, implementing changes, measuring results';
  }
  if (lowerName.includes('benchmark reporter') && lowerName.includes('quality')) {
    return 'Reporting quality benchmarks, comparing performance, identifying gaps';
  }
  
  // Manufacturing agents
  if (lowerName.includes('production strategy') && lowerName.includes('cpo')) {
    return 'Advising on production strategy, optimizing operations, reducing costs';
  }
  if (lowerName.includes('capacity planner') && lowerName.includes('production')) {
    return 'Planning production capacity, forecasting demand, optimizing resources';
  }
  if (lowerName.includes('cost reduction') && lowerName.includes('analyst')) {
    return 'Analyzing costs, identifying savings, optimizing spend';
  }
  if (lowerName.includes('production line') && lowerName.includes('optimizer')) {
    return 'Optimizing production lines, improving efficiency, reducing waste';
  }
  if (lowerName.includes('yield tracker') && lowerName.includes('manufacturing')) {
    return 'Tracking yields, monitoring quality, identifying improvements';
  }
  if (lowerName.includes('throughput analyzer') && lowerName.includes('manufacturing')) {
    return 'Analyzing throughput, identifying bottlenecks, optimizing production';
  }
  if (lowerName.includes('quality standards') && lowerName.includes('qa')) {
    return 'Enforcing quality standards, ensuring compliance, maintaining excellence';
  }
  if (lowerName.includes('audit scheduler') && lowerName.includes('quality assurance')) {
    return 'Scheduling quality audits, ensuring compliance, maintaining standards';
  }
  if (lowerName.includes('corrective action') && lowerName.includes('monitor')) {
    return 'Monitoring corrective actions, tracking progress, ensuring resolution';
  }
  if (lowerName.includes('shift coordinator') && lowerName.includes('production manager')) {
    return 'Coordinating production shifts, managing operations, ensuring continuity';
  }
  if (lowerName.includes('production scheduler') && lowerName.includes('manager')) {
    return 'Scheduling production, planning runs, optimizing capacity';
  }
  if (lowerName.includes('output tracker') && lowerName.includes('production')) {
    return 'Tracking production output, monitoring performance, identifying issues';
  }
  if (lowerName.includes('inspection planner') && lowerName.includes('quality manager')) {
    return 'Planning inspections, ensuring quality, maintaining standards';
  }
  if (lowerName.includes('defect categorizer') && lowerName.includes('quality')) {
    return 'Categorizing defects, analyzing issues, identifying root causes';
  }
  if (lowerName.includes('supplier quality') && lowerName.includes('auditor')) {
    return 'Auditing supplier quality, ensuring standards, managing vendors';
  }
  if (lowerName.includes('hazard identifier') && lowerName.includes('safety')) {
    return 'Identifying hazards, assessing risks, implementing controls';
  }
  if (lowerName.includes('safety trainer') && lowerName.includes('manager')) {
    return 'Training safety, educating workers, ensuring compliance';
  }
  if (lowerName.includes('incident investigator') && lowerName.includes('safety')) {
    return 'Investigating incidents, identifying causes, preventing recurrence';
  }
  if (lowerName.includes('material requirements') && lowerName.includes('planner')) {
    return 'Planning material requirements, managing inventory, ensuring availability';
  }
  if (lowerName.includes('capacity loader') && lowerName.includes('production')) {
    return 'Loading capacity, planning production, optimizing utilization';
  }
  if (lowerName.includes('order sequencer') && lowerName.includes('production')) {
    return 'Sequencing orders, optimizing production, managing flow';
  }
  if (lowerName.includes('measurement analyst') && lowerName.includes('quality inspector')) {
    return 'Analyzing measurements, ensuring accuracy, maintaining quality';
  }
  if (lowerName.includes('specification checker') && lowerName.includes('quality')) {
    return 'Checking specifications, ensuring compliance, maintaining quality';
  }
  if (lowerName.includes('non-conformance') && lowerName.includes('reporter')) {
    return 'Reporting non-conformance, tracking issues, ensuring resolution';
  }
  if (lowerName.includes('supplier scheduler') && lowerName.includes('supply chain')) {
    return 'Scheduling suppliers, managing deliveries, optimizing inventory';
  }
  if (lowerName.includes('delivery tracker') && lowerName.includes('supply chain')) {
    return 'Tracking deliveries, monitoring shipments, ensuring availability';
  }
  if (lowerName.includes('inventory buffer') && lowerName.includes('manager')) {
    return 'Managing inventory buffers, optimizing stock, ensuring availability';
  }
  if (lowerName.includes('predictive maintenance') && lowerName.includes('monitor')) {
    return 'Monitoring predictive maintenance, anticipating failures, reducing downtime';
  }
  if (lowerName.includes('repair scheduler') && lowerName.includes('maintenance')) {
    return 'Scheduling repairs, managing maintenance, minimizing downtime';
  }
  if (lowerName.includes('spare parts') && lowerName.includes('manager')) {
    return 'Managing spare parts, optimizing inventory, ensuring availability';
  }
  if (lowerName.includes('stock level') && lowerName.includes('monitor')) {
    return 'Monitoring stock levels, managing inventory, optimizing reorder points';
  }
  if (lowerName.includes('reorder point') && lowerName.includes('calculator')) {
    return 'Calculating reorder points, optimizing inventory, preventing stockouts';
  }
  if (lowerName.includes('cycle count') && lowerName.includes('coordinator')) {
    return 'Coordinating cycle counts, ensuring accuracy, maintaining inventory';
  }
  if (lowerName.includes('waste identifier') && lowerName.includes('lean')) {
    return 'Identifying waste, categorizing inefficiencies, proposing improvements';
  }
  if (lowerName.includes('value stream') && lowerName.includes('mapper')) {
    return 'Mapping value streams, analyzing flows, identifying waste';
  }
  if (lowerName.includes('kaizen facilitator') && lowerName.includes('lean')) {
    return 'Facilitating kaizen, driving continuous improvement, engaging teams';
  }
  if (lowerName.includes('compliance auditor') && lowerName.includes('safety inspector')) {
    return 'Auditing safety compliance, ensuring adherence, maintaining standards';
  }
  if (lowerName.includes('risk assessor') && lowerName.includes('safety')) {
    return 'Assessing safety risks, identifying hazards, implementing controls';
  }
  if (lowerName.includes('corrective action') && lowerName.includes('tracker')) {
    return 'Tracking corrective actions, monitoring progress, ensuring resolution';
  }
  
  // Logistics agents
  if (lowerName.includes('shipment planner') && lowerName.includes('logistics coordinator')) {
    return 'Planning shipments, coordinating logistics, optimizing delivery';
  }
  if (lowerName.includes('carrier selector') && lowerName.includes('logistics')) {
    return 'Selecting carriers, evaluating options, optimizing costs';
  }
  if (lowerName.includes('delivery optimizer') && lowerName.includes('logistics')) {
    return 'Optimizing deliveries, improving speed, reducing costs';
  }
  if (lowerName.includes('logistics strategy') && lowerName.includes('clo')) {
    return 'Advising on logistics strategy, optimizing networks, reducing costs';
  }
  if (lowerName.includes('network optimizer') && lowerName.includes('logistics')) {
    return 'Optimizing logistics networks, designing routes, improving efficiency';
  }
  if (lowerName.includes('cost-to-serve') && lowerName.includes('analyst')) {
    return 'Analyzing cost-to-serve, identifying savings, optimizing logistics';
  }
  if (lowerName.includes('fleet strategy') && lowerName.includes('transportation')) {
    return 'Planning fleet strategy, optimizing assets, managing capacity';
  }
  if (lowerName.includes('route network') && lowerName.includes('designer')) {
    return 'Designing route networks, optimizing coverage, improving service';
  }
  if (lowerName.includes('capacity planner') && lowerName.includes('transportation')) {
    return 'Planning transportation capacity, forecasting demand, optimizing resources';
  }
  if (lowerName.includes('hub operations') && lowerName.includes('optimizer')) {
    return 'Optimizing hub operations, improving efficiency, reducing costs';
  }
  if (lowerName.includes('throughput monitor') && lowerName.includes('logistics operations')) {
    return 'Monitoring throughput, tracking performance, identifying bottlenecks';
  }
  if (lowerName.includes('sla enforcer') && lowerName.includes('logistics')) {
    return 'Enforcing SLAs, monitoring performance, ensuring compliance';
  }
  if (lowerName.includes('vehicle scheduler') && lowerName.includes('fleet manager')) {
    return 'Scheduling vehicles, optimizing utilization, managing capacity';
  }
  if (lowerName.includes('fuel efficiency') && lowerName.includes('monitor')) {
    return 'Monitoring fuel efficiency, reducing consumption, optimizing costs';
  }
  if (lowerName.includes('maintenance planner') && lowerName.includes('fleet')) {
    return 'Planning fleet maintenance, optimizing uptime, reducing costs';
  }
  if (lowerName.includes('slot optimizer') && lowerName.includes('warehouse')) {
    return 'Optimizing warehouse slots, improving layout, increasing efficiency';
  }
  if (lowerName.includes('pick path') && lowerName.includes('planner')) {
    return 'Planning pick paths, optimizing routes, improving efficiency';
  }
  if (lowerName.includes('labor scheduler') && lowerName.includes('warehouse')) {
    return 'Scheduling warehouse labor, optimizing workforce, managing costs';
  }
  if (lowerName.includes('zone planner') && lowerName.includes('distribution')) {
    return 'Planning distribution zones, optimizing layout, improving efficiency';
  }
  if (lowerName.includes('delivery window') && lowerName.includes('manager')) {
    return 'Managing delivery windows, optimizing schedules, improving service';
  }
  if (lowerName.includes('carrier allocator') && lowerName.includes('distribution')) {
    return 'Allocating carriers, optimizing capacity, managing costs';
  }
  if (lowerName.includes('traffic predictor') && lowerName.includes('route optimizer')) {
    return 'Predicting traffic, optimizing routes, improving delivery times';
  }
  if (lowerName.includes('multi-stop') && lowerName.includes('planner')) {
    return 'Planning multi-stop routes, optimizing deliveries, improving efficiency';
  }
  if (lowerName.includes('real-time rerouter') && lowerName.includes('route')) {
    return 'Rerouting in real-time, adapting to conditions, optimizing deliveries';
  }
  if (lowerName.includes('dispatch optimizer') && lowerName.includes('fleet coordinator')) {
    return 'Optimizing dispatch, managing assignments, improving efficiency';
  }
  if (lowerName.includes('driver assignment') && lowerName.includes('agent')) {
    return 'Assigning drivers, optimizing routes, managing capacity';
  }
  if (lowerName.includes('vehicle tracker') && lowerName.includes('fleet')) {
    return 'Tracking vehicles, monitoring location, optimizing operations';
  }
  if (lowerName.includes('inventory put-away') && lowerName.includes('agent')) {
    return 'Managing inventory put-away, optimizing storage, improving efficiency';
  }
  if (lowerName.includes('pick & pack') && lowerName.includes('coordinator')) {
    return 'Coordinating pick & pack, optimizing operations, improving efficiency';
  }
  if (lowerName.includes('return processor') && lowerName.includes('warehouse')) {
    return 'Processing returns, managing inventory, optimizing recovery';
  }
  if (lowerName.includes('load matcher') && lowerName.includes('dispatcher')) {
    return 'Matching loads, optimizing capacity, improving efficiency';
  }
  if (lowerName.includes('driver communicator') && lowerName.includes('dispatcher')) {
    return 'Communicating with drivers, coordinating operations, improving service';
  }
  if (lowerName.includes('delivery sequencer') && lowerName.includes('dispatcher')) {
    return 'Sequencing deliveries, optimizing routes, improving efficiency';
  }
  if (lowerName.includes('shipment monitor') && lowerName.includes('tracking')) {
    return 'Monitoring shipments, tracking status, providing visibility';
  }
  if (lowerName.includes('eta predictor') && lowerName.includes('tracking')) {
    return 'Predicting ETAs, managing expectations, improving service';
  }
  if (lowerName.includes('exception alerter') && lowerName.includes('tracking')) {
    return 'Alerting exceptions, identifying issues, enabling quick response';
  }
  if (lowerName.includes('delivery window') && lowerName.includes('negotiator')) {
    return 'Negotiating delivery windows, managing expectations, improving service';
  }
  if (lowerName.includes('proof-of-delivery') && lowerName.includes('manager')) {
    return 'Managing proof-of-delivery, documenting receipts, ensuring accountability';
  }
  if (lowerName.includes('customer notifier') && lowerName.includes('last mile')) {
    return 'Notifying customers, providing updates, improving experience';
  }
  if (lowerName.includes('rate negotiator') && lowerName.includes('freight')) {
    return 'Negotiating freight rates, reducing costs, optimizing spend';
  }
  if (lowerName.includes('carrier qualifier') && lowerName.includes('freight')) {
    return 'Qualifying carriers, evaluating options, ensuring quality';
  }
  if (lowerName.includes('lane optimizer') && lowerName.includes('freight')) {
    return 'Optimizing lanes, improving routes, reducing costs';
  }
  if (lowerName.includes('duty calculator') && lowerName.includes('customs')) {
    return 'Calculating duties, managing tariffs, optimizing costs';
  }
  if (lowerName.includes('document preparer') && lowerName.includes('customs')) {
    return 'Preparing customs documents, ensuring compliance, facilitating clearance';
  }
  if (lowerName.includes('compliance checker') && lowerName.includes('customs')) {
    return 'Checking customs compliance, ensuring adherence, preventing delays';
  }
  
  // Government agents
  if (lowerName.includes('public sector strategy') && lowerName.includes('cao gov')) {
    return 'Advising on public sector strategy, planning government operations, serving citizens';
  }
  if (lowerName.includes('budget allocator') && lowerName.includes('government')) {
    return 'Allocating government budgets, managing public funds, optimizing resources';
  }
  if (lowerName.includes('inter-agency') && lowerName.includes('coordinator')) {
    return 'Coordinating inter-agency efforts, facilitating collaboration, improving efficiency';
  }
  if (lowerName.includes('policy researcher') && lowerName.includes('public policy')) {
    return 'Researching policies, analyzing impacts, informing decisions';
  }
  if (lowerName.includes('stakeholder mapper') && lowerName.includes('public policy')) {
    return 'Mapping stakeholders, identifying interests, managing relationships';
  }
  if (lowerName.includes('impact assessor') && lowerName.includes('public policy')) {
    return 'Assessing policy impacts, evaluating outcomes, informing decisions';
  }
  if (lowerName.includes('regulatory tracker') && lowerName.includes('regulatory affairs')) {
    return 'Tracking regulations, monitoring changes, ensuring compliance';
  }
  if (lowerName.includes('submission coordinator') && lowerName.includes('regulatory')) {
    return 'Coordinating submissions, managing filings, ensuring compliance';
  }
  if (lowerName.includes('comment drafter') && lowerName.includes('regulatory')) {
    return 'Drafting regulatory comments, providing feedback, influencing policy';
  }
  if (lowerName.includes('community outreach') && lowerName.includes('planner')) {
    return 'Planning community outreach, engaging citizens, building trust';
  }
  if (lowerName.includes('feedback analyzer') && lowerName.includes('public engagement')) {
    return 'Analyzing public feedback, gathering insights, improving services';
  }
  if (lowerName.includes('communication strategist') && lowerName.includes('public')) {
    return 'Strategizing communications, engaging public, managing messaging';
  }
  if (lowerName.includes('policy drafter') && lowerName.includes('policy manager')) {
    return 'Drafting policies, creating regulations, ensuring clarity';
  }
  if (lowerName.includes('implementation tracker') && lowerName.includes('policy')) {
    return 'Tracking policy implementation, monitoring progress, ensuring execution';
  }
  if (lowerName.includes('review scheduler') && lowerName.includes('policy')) {
    return 'Scheduling policy reviews, ensuring currency, maintaining relevance';
  }
  if (lowerName.includes('grant opportunity') && lowerName.includes('scanner')) {
    return 'Scanning grant opportunities, identifying funding, supporting programs';
  }
  if (lowerName.includes('application writer') && lowerName.includes('grants')) {
    return 'Writing grant applications, securing funding, supporting programs';
  }
  if (lowerName.includes('compliance reporter') && lowerName.includes('grants')) {
    return 'Reporting grant compliance, ensuring adherence, managing requirements';
  }
  if (lowerName.includes('data analyst') && lowerName.includes('policy analyst')) {
    return 'Analyzing policy data, providing insights, informing decisions';
  }
  if (lowerName.includes('benchmark researcher') && lowerName.includes('policy')) {
    return 'Researching policy benchmarks, comparing approaches, identifying best practices';
  }
  if (lowerName.includes('recommendation drafter') && lowerName.includes('policy')) {
    return 'Drafting policy recommendations, proposing changes, influencing decisions';
  }
  if (lowerName.includes('regulation interpreter') && lowerName.includes('regulatory specialist')) {
    return 'Interpreting regulations, explaining requirements, ensuring compliance';
  }
  if (lowerName.includes('compliance gap') && lowerName.includes('analyst')) {
    return 'Analyzing compliance gaps, identifying deficiencies, planning remediation';
  }
  if (lowerName.includes('filing coordinator') && lowerName.includes('regulatory')) {
    return 'Coordinating filings, managing submissions, ensuring compliance';
  }
  if (lowerName.includes('press release') && lowerName.includes('writer')) {
    return 'Writing press releases, communicating news, managing media';
  }
  if (lowerName.includes('media monitor') && lowerName.includes('public affairs')) {
    return 'Monitoring media, tracking coverage, managing reputation';
  }
  if (lowerName.includes('crisis communicator') && lowerName.includes('public affairs')) {
    return 'Communicating crises, managing reputation, protecting interests';
  }
  if (lowerName.includes('budget preparer') && lowerName.includes('grants specialist')) {
    return 'Preparing grant budgets, managing funds, ensuring compliance';
  }
  if (lowerName.includes('performance reporter') && lowerName.includes('grants')) {
    return 'Reporting grant performance, measuring outcomes, ensuring accountability';
  }
  if (lowerName.includes('audit liaison') && lowerName.includes('grants')) {
    return 'Liaising with auditors, coordinating reviews, ensuring compliance';
  }
  if (lowerName.includes('ethics monitor') && lowerName.includes('government compliance')) {
    return 'Monitoring ethics, ensuring integrity, maintaining standards';
  }
  if (lowerName.includes('reporting automator') && lowerName.includes('government')) {
    return 'Automating government reporting, ensuring compliance, reducing workload';
  }
  if (lowerName.includes('record keeper') && lowerName.includes('government')) {
    return 'Keeping government records, maintaining documentation, ensuring accessibility';
  }
  if (lowerName.includes('data publisher') && lowerName.includes('transparency')) {
    return 'Publishing government data, ensuring transparency, enabling access';
  }
  if (lowerName.includes('foia responder') && lowerName.includes('transparency')) {
    return 'Responding to FOIA requests, providing information, ensuring compliance';
  }
  if (lowerName.includes('accountability auditor') && lowerName.includes('transparency')) {
    return 'Auditing accountability, ensuring transparency, maintaining trust';
  }
  
  // Supply Chain Operations agents
  if (lowerName.includes('supply chain strategist') && lowerName.includes('vp')) {
    return 'Strategizing supply chains, optimizing networks, reducing costs';
  }
  if (lowerName.includes('network designer') && lowerName.includes('supply chain')) {
    return 'Designing supply chain networks, optimizing flows, improving efficiency';
  }
  if (lowerName.includes('cost optimizer') && lowerName.includes('supply chain')) {
    return 'Optimizing supply chain costs, reducing spend, improving margins';
  }
  if (lowerName.includes('sourcing strategist') && lowerName.includes('procurement')) {
    return 'Strategizing sourcing, identifying suppliers, optimizing procurement';
  }
  if (lowerName.includes('contract negotiator') && lowerName.includes('procurement')) {
    return 'Negotiating contracts, securing terms, optimizing value';
  }
  if (lowerName.includes('supplier evaluator') && lowerName.includes('procurement')) {
    return 'Evaluating suppliers, assessing performance, managing relationships';
  }
  if (lowerName.includes('transport mode') && lowerName.includes('selector')) {
    return 'Selecting transport modes, optimizing logistics, reducing costs';
  }
  if (lowerName.includes('cost analyzer') && lowerName.includes('logistics manager')) {
    return 'Analyzing logistics costs, identifying savings, optimizing spend';
  }
  if (lowerName.includes('service level') && lowerName.includes('monitor')) {
    return 'Monitoring service levels, ensuring performance, maintaining quality';
  }
  if (lowerName.includes('layout optimizer') && lowerName.includes('warehouse lead')) {
    return 'Optimizing warehouse layouts, improving efficiency, reducing costs';
  }
  if (lowerName.includes('safety enforcer') && lowerName.includes('warehouse')) {
    return 'Enforcing warehouse safety, ensuring compliance, preventing accidents';
  }
  if (lowerName.includes('productivity tracker') && lowerName.includes('warehouse')) {
    return 'Tracking warehouse productivity, measuring performance, identifying improvements';
  }
  if (lowerName.includes('rfq issuer') && lowerName.includes('procurement buyer')) {
    return 'Issuing RFQs, soliciting bids, managing procurement';
  }
  if (lowerName.includes('bid analyzer') && lowerName.includes('procurement')) {
    return 'Analyzing bids, evaluating proposals, selecting suppliers';
  }
  if (lowerName.includes('order placer') && lowerName.includes('procurement')) {
    return 'Placing orders, managing purchasing, ensuring delivery';
  }
  if (lowerName.includes('stock optimizer') && lowerName.includes('inventory specialist')) {
    return 'Optimizing stock levels, managing inventory, reducing costs';
  }
  if (lowerName.includes('abc analyzer') && lowerName.includes('inventory')) {
    return 'Analyzing ABC inventory, categorizing items, optimizing management';
  }
  if (lowerName.includes('obsolescence tracker') && lowerName.includes('inventory')) {
    return 'Tracking obsolescence, managing aging inventory, reducing waste';
  }
  if (lowerName.includes('forecast modeler') && lowerName.includes('demand planner')) {
    return 'Modeling demand forecasts, predicting needs, optimizing inventory';
  }
  if (lowerName.includes('seasonality adjuster') && lowerName.includes('demand')) {
    return 'Adjusting for seasonality, normalizing demand, improving accuracy';
  }
  if (lowerName.includes('bias corrector') && lowerName.includes('demand')) {
    return 'Correcting forecast bias, improving accuracy, optimizing planning';
  }
  if (lowerName.includes('performance scorer') && lowerName.includes('supplier relations')) {
    return 'Scoring supplier performance, evaluating vendors, managing relationships';
  }
  if (lowerName.includes('risk monitor') && lowerName.includes('supplier')) {
    return 'Monitoring supplier risk, assessing exposure, managing dependencies';
  }
  if (lowerName.includes('relationship manager') && lowerName.includes('supplier')) {
    return 'Managing supplier relationships, building partnerships, ensuring quality';
  }
  if (lowerName.includes('carrier booker') && lowerName.includes('shipping')) {
    return 'Booking carriers, managing shipments, optimizing logistics';
  }
  if (lowerName.includes('document preparer') && lowerName.includes('shipping')) {
    return 'Preparing shipping documents, ensuring compliance, facilitating logistics';
  }
  if (lowerName.includes('tracking monitor') && lowerName.includes('shipping')) {
    return 'Monitoring shipments, tracking status, providing visibility';
  }
  if (lowerName.includes('order processor') && lowerName.includes('fulfillment')) {
    return 'Processing orders, managing fulfillment, ensuring delivery';
  }
  if (lowerName.includes('pick list') && lowerName.includes('generator')) {
    return 'Generating pick lists, optimizing picking, improving efficiency';
  }
  if (lowerName.includes('packaging optimizer') && lowerName.includes('fulfillment')) {
    return 'Optimizing packaging, reducing waste, improving efficiency';
  }
  
  // Automation agents
  if (lowerName.includes('automation strategy') && lowerName.includes('cao')) {
    return 'Advising on automation strategy, planning initiatives, maximizing ROI';
  }
  if (lowerName.includes('roi calculator') && lowerName.includes('automation')) {
    return 'Calculating automation ROI, measuring benefits, justifying investments';
  }
  if (lowerName.includes('technology evaluator') && lowerName.includes('automation')) {
    return 'Evaluating automation technologies, selecting solutions, ensuring fit';
  }
  if (lowerName.includes('automation pipeline') && lowerName.includes('manager')) {
    return 'Managing automation pipelines, orchestrating workflows, ensuring reliability';
  }
  if (lowerName.includes('tool selector') && lowerName.includes('automation')) {
    return 'Selecting automation tools, evaluating solutions, optimizing tech stack';
  }
  if (lowerName.includes('implementation planner') && lowerName.includes('automation')) {
    return 'Planning automation implementations, managing projects, ensuring success';
  }
  if (lowerName.includes('process miner') && lowerName.includes('process excellence')) {
    return 'Mining processes, discovering workflows, identifying automation opportunities';
  }
  if (lowerName.includes('maturity assessor') && lowerName.includes('process')) {
    return 'Assessing process maturity, identifying gaps, planning improvements';
  }
  if (lowerName.includes('benchmark analyzer') && lowerName.includes('process excellence')) {
    return 'Analyzing process benchmarks, comparing performance, identifying improvements';
  }
  if (lowerName.includes('automation runbook') && lowerName.includes('author')) {
    return 'Authoring automation runbooks, documenting procedures, ensuring knowledge transfer';
  }
  if (lowerName.includes('exception handler') && lowerName.includes('automation operations')) {
    return 'Handling automation exceptions, managing errors, ensuring continuity';
  }
  if (lowerName.includes('performance monitor') && lowerName.includes('automation')) {
    return 'Monitoring automation performance, tracking metrics, identifying issues';
  }
  if (lowerName.includes('bot deployer') && lowerName.includes('rpa')) {
    return 'Deploying RPA bots, managing automation, ensuring reliability';
  }
  if (lowerName.includes('license manager') && lowerName.includes('rpa')) {
    return 'Managing RPA licenses, optimizing costs, ensuring compliance';
  }
  if (lowerName.includes('bot health') && lowerName.includes('monitor')) {
    return 'Monitoring bot health, tracking performance, ensuring reliability';
  }
  if (lowerName.includes('workflow designer') && lowerName.includes('workflow specialist')) {
    return 'Designing workflows, creating automations, optimizing processes';
  }
  if (lowerName.includes('integration builder') && lowerName.includes('workflow')) {
    return 'Building integrations, connecting systems, enabling automation';
  }
  if (lowerName.includes('trigger configurator') && lowerName.includes('workflow')) {
    return 'Configuring triggers, defining automation rules, enabling workflows';
  }
  
  // VP-level agents (generic but specific to their role)
  if (lowerName.includes('vp ') || lowerName.includes('chief ')) {
    const role = agentName.replace('AI ', '').replace('VP ', '').replace('Chief ', '');
    return `Leading ${role.toLowerCase()} operations, developing strategies, managing teams, driving results`;
  }
  
  // Agent-specific patterns for remaining agents
  if (lowerName.includes('agent') && !lowerName.includes('specialist') && !lowerName.includes('manager') && !lowerName.includes('analyst')) {
    return `Automating ${lowerName.replace('ai ', '').replace(' agent', '')} processes, handling tasks, ensuring efficiency`;
  }
  
  // Manager-level agents
  if (lowerName.includes('manager')) {
    const area = agentName.replace('AI ', '').replace(' Manager', '');
    return `Managing ${area.toLowerCase()}, overseeing operations, ensuring quality, driving performance`;
  }
  
  // Analyst-level agents
  if (lowerName.includes('analyst')) {
    const area = agentName.replace('AI ', '').replace(' Analyst', '');
    return `Analyzing ${area.toLowerCase()}, identifying trends, providing insights, supporting decisions`;
  }
  
  // Specialist-level agents
  if (lowerName.includes('specialist')) {
    const area = agentName.replace('AI ', '').replace(' Specialist', '');
    return `Specializing in ${area.toLowerCase()}, providing expertise, handling complex tasks, ensuring quality`;
  }
  
  // Coordinator-level agents
  if (lowerName.includes('coordinator')) {
    const area = agentName.replace('AI ', '').replace(' Coordinator', '');
    return `Coordinating ${area.toLowerCase()}, managing workflows, ensuring alignment, facilitating collaboration`;
  }
  
  // Additional specific patterns
  if (lowerName.includes('lead development') || lowerName.includes('sdr')) {
    return 'Developing leads, qualifying prospects, initiating sales conversations, building pipeline';
  }
  if (lowerName.includes('sales rep') && !lowerName.includes('executive')) {
    return 'Selling products, engaging customers, closing deals, achieving targets';
  }
  if (lowerName.includes('sales executive')) {
    return 'Executing sales strategies, managing key accounts, driving revenue growth';
  }
  if (lowerName.includes('crm assistant')) {
    return 'Assisting with CRM, managing customer data, supporting sales teams';
  }
  if (lowerName.includes('proposal generator')) {
    return 'Generating proposals, creating documents, automating proposal creation';
  }
  if (lowerName.includes('negotiator') && !lowerName.includes('term')) {
    return 'Negotiating deals, managing discussions, reaching agreements';
  }
  if (lowerName.includes('trend analyzer')) {
    return 'Analyzing trends, identifying patterns, forecasting movements';
  }
  if (lowerName.includes('content recommender')) {
    return 'Recommending content, suggesting materials, providing resources';
  }
  if (lowerName.includes('training scheduler')) {
    return 'Scheduling training, planning sessions, coordinating learning';
  }
  if (lowerName.includes('budget allocator') && lowerName.includes('marketing')) {
    return 'Allocating marketing budgets, optimizing spend, managing resources';
  }
  if (lowerName.includes('experiment designer')) {
    return 'Designing experiments, planning tests, defining hypotheses';
  }
  if (lowerName.includes('task assigner')) {
    return 'Assigning tasks, distributing work, managing assignments';
  }
  if (lowerName.includes('deadline tracker')) {
    return 'Tracking deadlines, monitoring due dates, ensuring timely delivery';
  }
  if (lowerName.includes('post scheduler') && lowerName.includes('social')) {
    return 'Scheduling social posts, planning content, managing calendars';
  }
  if (lowerName.includes('engagement responder') && lowerName.includes('social')) {
    return 'Responding to social engagement, managing interactions, building community';
  }
  if (lowerName.includes('email marketing')) {
    return 'Managing email marketing, designing campaigns, executing email strategies';
  }
  if (lowerName.includes('template designer') && lowerName.includes('email')) {
    return 'Designing email templates, creating layouts, optimizing formats';
  }
  if (lowerName.includes('ad campaign')) {
    return 'Managing ad campaigns, optimizing performance, maximizing ROI';
  }
  if (lowerName.includes('bid optimizer') && lowerName.includes('ad')) {
    return 'Optimizing ad bids, managing budgets, maximizing ROI';
  }
  if (lowerName.includes('creative tester') && lowerName.includes('ad')) {
    return 'Testing ad creatives, comparing variations, optimizing performance';
  }
  if (lowerName.includes('marketing analytics')) {
    return 'Analyzing marketing data, measuring performance, providing insights';
  }
  if (lowerName.includes('attribution modeler')) {
    return 'Modeling attribution, tracking conversions, assigning credit';
  }
  if (lowerName.includes('kpi dashboard') && lowerName.includes('marketing')) {
    return 'Building marketing dashboards, visualizing metrics, tracking KPIs';
  }
  if (lowerName.includes('insight summarizer') && lowerName.includes('marketing')) {
    return 'Summarizing marketing insights, extracting findings, reporting results';
  }
  if (lowerName.includes('growth hacker')) {
    return 'Hacking growth, implementing strategies, driving rapid expansion';
  }
  if (lowerName.includes('chief operating officer')) {
    return 'Leading operations, optimizing processes, managing day-to-day activities';
  }
  if (lowerName.includes('operational efficiency')) {
    return 'Analyzing operational efficiency, identifying improvements, optimizing processes';
  }
  if (lowerName.includes('cross-dept')) {
    return 'Coordinating cross-department efforts, facilitating collaboration, breaking silos';
  }
  if (lowerName.includes('strategic initiative')) {
    return 'Tracking strategic initiatives, monitoring progress, ensuring execution';
  }
  if (lowerName.includes('process auditor') && lowerName.includes('operations')) {
    return 'Auditing processes, identifying inefficiencies, recommending improvements';
  }
  if (lowerName.includes('sla monitor') && lowerName.includes('operations')) {
    return 'Monitoring SLAs, tracking performance, ensuring compliance';
  }
  if (lowerName.includes('capacity planner') && lowerName.includes('operations')) {
    return 'Planning capacity, forecasting needs, optimizing resources';
  }
  if (lowerName.includes('vp supply chain')) {
    return 'Leading supply chain, managing logistics, optimizing distribution';
  }
  if (lowerName.includes('supplier risk')) {
    return 'Assessing supplier risks, evaluating vendors, managing dependencies';
  }
  if (lowerName.includes('inventory optimizer') && lowerName.includes('supply chain')) {
    return 'Optimizing inventory, managing stock levels, reducing carrying costs';
  }
  if (lowerName.includes('logistics cost')) {
    return 'Analyzing logistics costs, identifying savings, optimizing spend';
  }
  if (lowerName.includes('vp quality')) {
    return 'Leading quality, maintaining standards, ensuring excellence';
  }
  if (lowerName.includes('quality standards') && lowerName.includes('operations')) {
    return 'Enforcing quality standards, maintaining compliance, ensuring excellence';
  }
  if (lowerName.includes('defect pattern') && lowerName.includes('operations')) {
    return 'Analyzing defect patterns, identifying root causes, preventing issues';
  }
  if (lowerName.includes('compliance tracker') && lowerName.includes('operations')) {
    return 'Tracking compliance, monitoring regulations, ensuring adherence';
  }
  if (lowerName.includes('vp facilities')) {
    return 'Leading facilities, managing buildings, optimizing space';
  }
  if (lowerName.includes('space utilization')) {
    return 'Analyzing space utilization, optimizing layouts, managing facilities';
  }
  if (lowerName.includes('maintenance scheduler') && lowerName.includes('facilities')) {
    return 'Scheduling maintenance, planning repairs, optimizing uptime';
  }
  if (lowerName.includes('energy efficiency')) {
    return 'Monitoring energy efficiency, reducing consumption, optimizing costs';
  }
  if (lowerName.includes('vp project management')) {
    return 'Leading project management, overseeing projects, ensuring delivery';
  }
  if (lowerName.includes('milestone tracker') && lowerName.includes('project')) {
    return 'Tracking milestones, monitoring progress, ensuring deadlines';
  }
  if (lowerName.includes('resource allocator') && lowerName.includes('project')) {
    return 'Allocating resources, managing capacity, optimizing utilization';
  }
  if (lowerName.includes('risk identifier') && lowerName.includes('project')) {
    return 'Identifying project risks, assessing threats, planning mitigations';
  }
  if (lowerName.includes('operations manager') && !lowerName.includes('(sub)')) {
    return 'Managing operations, overseeing workflows, ensuring efficiency';
  }
  if (lowerName.includes('daily operations')) {
    return 'Coordinating daily operations, managing workflows, ensuring smooth execution';
  }
  if (lowerName.includes('escalation handler') && lowerName.includes('operations')) {
    return 'Handling escalations, resolving issues, coordinating responses';
  }
  if (lowerName.includes('performance reporter') && lowerName.includes('operations')) {
    return 'Reporting operational performance, tracking metrics, identifying trends';
  }
  if (lowerName.includes('workflow monitor')) {
    return 'Monitoring workflows, tracking processes, identifying bottlenecks';
  }
  if (lowerName.includes('bottleneck detector')) {
    return 'Detecting bottlenecks, identifying constraints, optimizing flow';
  }
  if (lowerName.includes('efficiency reporter') && lowerName.includes('operations')) {
    return 'Reporting efficiency, tracking metrics, identifying improvements';
  }
  if (lowerName.includes('process mapper')) {
    return 'Mapping processes, documenting workflows, visualizing operations';
  }
  if (lowerName.includes('automation rule')) {
    return 'Building automation rules, configuring workflows, streamlining processes';
  }
  if (lowerName.includes('exception handler') && lowerName.includes('workflow')) {
    return 'Handling exceptions, managing errors, ensuring continuity';
  }
  if (lowerName.includes('task coordinator')) {
    return 'Coordinating tasks, managing workloads, ensuring completion';
  }
  if (lowerName.includes('task prioritizer')) {
    return 'Prioritizing tasks, managing workloads, optimizing schedules';
  }
  if (lowerName.includes('deadline enforcer')) {
    return 'Enforcing deadlines, tracking due dates, ensuring timely delivery';
  }
  if (lowerName.includes('dependency tracker')) {
    return 'Tracking dependencies, managing relationships, coordinating tasks';
  }
  if (lowerName.includes('process optimization') && lowerName.includes('agent')) {
    return 'Optimizing processes, improving efficiency, reducing waste';
  }
  if (lowerName.includes('lean analyst')) {
    return 'Analyzing processes for lean, identifying waste, recommending improvements';
  }
  if (lowerName.includes('waste identifier') && lowerName.includes('process')) {
    return 'Identifying waste, categorizing inefficiencies, proposing solutions';
  }
  if (lowerName.includes('improvement recommender') && lowerName.includes('process')) {
    return 'Recommending improvements, suggesting changes, optimizing processes';
  }
  if (lowerName.includes('resource planner')) {
    return 'Planning resources, forecasting needs, optimizing allocation';
  }
  if (lowerName.includes('demand forecaster') && lowerName.includes('resource')) {
    return 'Forecasting resource demand, predicting needs, planning capacity';
  }
  if (lowerName.includes('allocation optimizer') && lowerName.includes('resource')) {
    return 'Optimizing resource allocation, maximizing utilization, balancing workloads';
  }
  if (lowerName.includes('utilization tracker') && lowerName.includes('resource')) {
    return 'Tracking resource utilization, monitoring capacity, identifying gaps';
  }
  if (lowerName.includes('quality assurance') && lowerName.includes('agent')) {
    return 'Ensuring quality, maintaining standards, preventing defects';
  }
  if (lowerName.includes('test case generator') && lowerName.includes('quality')) {
    return 'Generating test cases, designing scenarios, ensuring coverage';
  }
  if (lowerName.includes('defect logger') && lowerName.includes('quality')) {
    return 'Logging defects, tracking issues, managing bug reports';
  }
  if (lowerName.includes('regression tracker') && lowerName.includes('quality')) {
    return 'Tracking regressions, monitoring quality, preventing defects';
  }
  if (lowerName.includes('chief financial officer')) {
    return 'Leading finance, managing finances, overseeing fiscal operations';
  }
  if (lowerName.includes('financial strategy') && lowerName.includes('advisor')) {
    return 'Advising on financial strategy, planning fiscal direction, optimizing capital';
  }
  if (lowerName.includes('capital allocation')) {
    return 'Allocating capital, optimizing investments, managing resources';
  }
  if (lowerName.includes('risk-reward') && lowerName.includes('finance')) {
    return 'Analyzing risk-reward, assessing investments, balancing portfolios';
  }
  if (lowerName.includes('vp finance')) {
    return 'Leading finance operations, managing financial activities, ensuring fiscal health';
  }
  if (lowerName.includes('vp accounting')) {
    return 'Leading accounting, managing financial records, ensuring accuracy';
  }
  if (lowerName.includes('vp treasury')) {
    return 'Leading treasury, managing cash, optimizing liquidity';
  }
  if (lowerName.includes('vp investor relations')) {
    return 'Leading investor relations, managing communications, building relationships';
  }
  if (lowerName.includes('controller') && !lowerName.includes('gl')) {
    return 'Controlling finances, managing accounting, ensuring compliance';
  }
  if (lowerName.includes('finance manager')) {
    return 'Managing finance, overseeing budgets, ensuring fiscal health';
  }
  if (lowerName.includes('accounting manager')) {
    return 'Managing accounting, overseeing records, ensuring accuracy';
  }
  if (lowerName.includes('financial analyst')) {
    return 'Analyzing finances, providing insights, supporting decisions';
  }
  if (lowerName.includes('budget manager')) {
    return 'Managing budgets, tracking spend, optimizing allocation';
  }
  if (lowerName.includes('tax specialist')) {
    return 'Specializing in tax, ensuring compliance, optimizing tax position';
  }
  if (lowerName.includes('audit manager')) {
    return 'Managing audits, overseeing reviews, ensuring compliance';
  }
  if (lowerName.includes('treasury analyst')) {
    return 'Analyzing treasury, managing cash, optimizing investments';
  }
  if (lowerName.includes('chief technology officer')) {
    return 'Leading technology, managing IT, driving innovation';
  }
  if (lowerName.includes('chief automation officer')) {
    return 'Leading automation, managing initiatives, maximizing ROI';
  }
  if (lowerName.includes('automation strategy') && lowerName.includes('advisor')) {
    return 'Advising on automation strategy, planning initiatives, maximizing ROI';
  }
  if (lowerName.includes('roi calculator') && lowerName.includes('automation')) {
    return 'Calculating automation ROI, measuring benefits, justifying investments';
  }
  if (lowerName.includes('technology evaluator') && lowerName.includes('automation')) {
    return 'Evaluating automation technologies, selecting solutions, ensuring fit';
  }
  if (lowerName.includes('vp automation')) {
    return 'Leading automation operations, managing initiatives, driving efficiency';
  }
  if (lowerName.includes('vp process excellence')) {
    return 'Leading process excellence, optimizing operations, driving quality';
  }
  if (lowerName.includes('automation operations director')) {
    return 'Directing automation operations, managing teams, ensuring reliability';
  }
  if (lowerName.includes('exception handler') && lowerName.includes('automation')) {
    return 'Handling automation exceptions, managing errors, ensuring continuity';
  }
  if (lowerName.includes('performance monitor') && lowerName.includes('automation')) {
    return 'Monitoring automation performance, tracking metrics, identifying issues';
  }
  if (lowerName.includes('rpa manager')) {
    return 'Managing RPA, overseeing bots, ensuring reliability';
  }
  if (lowerName.includes('bot deployer')) {
    return 'Deploying bots, managing automation, ensuring reliability';
  }
  if (lowerName.includes('license manager') && lowerName.includes('rpa')) {
    return 'Managing RPA licenses, optimizing costs, ensuring compliance';
  }
  if (lowerName.includes('workflow designer') && lowerName.includes('workflow')) {
    return 'Designing workflows, creating automations, optimizing processes';
  }
  if (lowerName.includes('workflow specialist')) {
    return 'Specializing in workflows, designing processes, optimizing automation';
  }
  if (lowerName.includes('integration builder') && lowerName.includes('workflow')) {
    return 'Building integrations, connecting systems, enabling automation';
  }
  if (lowerName.includes('trigger configurator') && lowerName.includes('workflow')) {
    return 'Configuring triggers, defining automation rules, enabling workflows';
  }
  if (lowerName.includes('packaging optimizer') && lowerName.includes('fulfillment')) {
    return 'Optimizing packaging, reducing waste, improving efficiency';
  }
  
  // Default fallback
  return 'Automating business processes, improving efficiency, reducing manual work, enhancing decision-making';
}

// Process the file
const newLines = [];
let inTable = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is the table header line
  if (line.includes('| No. |') && line.includes('| Name of Agent')) {
    // Replace the header with new structure
    newLines.push('| No. | Name of Agent                          | Uses of Agents');
    newLines.push('|-----|----------------------------------------|----------------------------------------|');
    inTable = true;
    continue;
  }
  
  // Check if this is a table row
  if (inTable && line.startsWith('|') && line.includes('|')) {
    // Skip separator lines (lines with only dashes)
    if (line.match(/^\|[\s\-]+\|[\s\-]+\|[\s\-]+\|$/)) {
      continue;
    }
    
    // Parse the row
    const parts = line.split('|').map(p => p.trim());
    
    // Extract the number and agent name (columns 1 and 2)
    const number = parts[1] || '';
    const agentName = parts[2] || '';
    
    // Skip rows with no valid agent name (like separator lines)
    const trimmedName = agentName.trim();
    if (!trimmedName || trimmedName.match(/^[-\s]+$/) || trimmedName === '-----' || trimmedName === '--------') {
      continue;
    }
    
    // Generate uses based on agent name
    const uses = generateUses(agentName);
    
    // Create new row with only number, name, and uses
    newLines.push(`| ${number} | ${agentName.padEnd(38)} | ${uses}`);
    continue;
  }
  
  // If we're no longer in the table (empty line or separator line after table)
  if (inTable && (line.trim() === '' || line.startsWith('===='))) {
    inTable = false;
  }
  
  // Keep all other lines as is
  newLines.push(line);
}

// Write the transformed file
const outputPath = path.join(__dirname, 'shaida the agents lib by shaida', 'ai agents 1108');
fs.writeFileSync(outputPath, newLines.join('\n'), 'utf-8');

console.log('File transformed successfully!');
console.log('Removed: Main Agent, Sub Agents, Status columns');
console.log('Added: Uses of Agents column with appropriate uses for each agent');
