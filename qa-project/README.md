# VWO Login Portal - QA Delivery Package

This directory contains the complete quality engineering delivery package for the Login portal of **app.vwo.com**. 

## Folder Structure Summary

```
qa-project/
├── 01_Context_Brain/
│   ├── feature_context.md          # UI Elements & Selectors
│   ├── business_rules.md           # Business validation logic
│   ├── assumptions.md              # Scope parameters & timeouts
│   └── anti_hallucination_rules.md # Quality constraints & audit rules
├── 02_Test_Plan/
│   └── test_plan.docx              # Word test plan document (OpenXML)
├── 03_Test_Scenarios/
│   └── login_test_scenarios.xlsx   # 15 structured scenarios
├── 04_Test_Cases/
│   └── login_test_cases.xlsx       # 20 granular Excel test cases
├── 05_Bug_Report/
│   ├── bug_template.xlsx           # Empty defect format sheet
│   └── sample_bugs.xlsx            # Real bug logs (Dark mode color, Lockout counts)
├── 06_Traceability/
│   └── RTM.xlsx                    # Requirement to Test Case mapping
├── 07_Test_Matrix/
│   ├── test_matrix.xlsx            # Cross-browser config spreadsheet
│   └── test_matrix.html            # HTML Matrix view
├── 08_HTML_Reports/
│   ├── execution_report.html       # Visual execution dashboard
│   ├── defect_report.html          # Visual bug logging status dashboard
│   └── coverage_report.html        # Visual requirements coverage dashboard
├── 09_Prompt_Templates/
│   ├── test_case_prompt.md         # AI prompt to update test cases
│   ├── bug_report_prompt.md         # AI prompt to format bugs
│   └── test_plan_prompt.md         # AI prompt to rewrite plans
├── 10_QA_Notes/
│   ├── execution_notes.md          # Execution checklists
│   └── lessons_learned.md          # Retro & lessons learned
└── README.md                       # Navigation document
```

## Test Metrics Summary
* **Total Scenarios:** 15
* **Total Test Cases:** 20
* **Total Defect Templates:** 1 blank + 2 sample bug entries
* **Requirement Coverage:** 100% (All 10 target login requirements verified)
* **Automation Candidates:** 16 out of 20 test cases (80%)
* **High-Risk Quality Areas:** Brute force lockout security parameters and Dark Mode visual theme regressions.
