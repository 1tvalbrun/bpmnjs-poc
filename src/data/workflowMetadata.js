const workflowMetadata = {
  "workflowId": "9361e90a-54ab-40d1-8acd-3865c9e36c79",
  "name": "Ray-Many sections, nested, with conditions",
  "state": "DRAFT",
  "lastUpdatedDate": 1721668305000,
  "createdBy": "george.washington@simplysqueeze.me",
  "createdDate": 1717616881000,
  "lastModifiedBy": "george.washington@simplysqueeze.me",
  "workflowType": "EVENT",
  "metaEvents": [
    {
      "eventId": "05631b75-b300-45b7-9a2e-6b13d5828329",
      "valuesMap": {
        "integrationId": {
          "inputParameterId": "b6bea60c-8dc9-4bd9-a950-d5f8aa2c6a60",
          "bindName": "integrationId",
          "value": "6b6a425f-098c-11ec-8c5d-cdde4890d4d5",
          "displayValue": "Google|Simplysqueeze.me",
          "templateKeys": []
        }
      },
      "dynamicId": "900962f9-5032-4318-bffa-18765657e607",
      "version": "0.1.0"
    }
  ],
  "metaConditions": [
    {
      "conditionId": "c3c9b8f7-52ec-4c74-9424-04b3fa41b758",
      "valuesMap": {
        "integrationId": {
          "inputParameterId": "b6bea60c-8dc9-4bd9-a950-d5f8aa2c6a60",
          "evaluator": "is",
          "bindName": "integrationId",
          "value": "6b6a425f-098c-11ec-8c5d-cdde4890d4d5",
          "displayValue": "Google|Simplysqueeze.me",
          "hash": "51ab846cd82a53cd065003228c608dfd7d4b4f8611ec3e2d22bb7c1fa39ad14e",
          "templateKeys": []
        },
        "department": {
          "inputParameterId": "f5eef00c-3275-4e3e-b47b-188d77c16356",
          "evaluator": "is",
          "bindName": "department",
          "value": "QA",
          "displayValue": "QA",
          "hash": "c6f818a11161f4c7c0b9dbccb1607e32502fb2e46685533fccf3a81015d1c8fd",
          "templateKeys": []
        }
      },
      "dynamicId": "4efdeca0-8f0f-4864-83b2-1db9b30b1c28",
      "version": "0.1.0",
      "operand": "AND",
      "groupId": "d2411e9c-57c6-4ee5-b058-fc8a5daf02be",
      "branchId": "9a180115-a86c-401a-9a87-d08a9b341048",
      "sequence": 0
    },
    {
      "conditionId": "4c9cba07-98e3-45bf-af1d-5439e8096ae3",
      "valuesMap": {
        "integrationId": {
          "inputParameterId": "b6bea60c-8dc9-4bd9-a950-d5f8aa2c6a60",
          "evaluator": "is",
          "bindName": "integrationId",
          "value": "6b6a425f-098c-11ec-8c5d-cdde4890d4d5",
          "displayValue": "Google|Simplysqueeze.me",
          "hash": "51ab846cd82a53cd065003228c608dfd7d4b4f8611ec3e2d22bb7c1fa39ad14e",
          "templateKeys": []
        },
        "title": {
          "inputParameterId": "d907285e-ba6c-4a20-8969-bf09904f2774",
          "evaluator": "is",
          "bindName": "title",
          "value": "Tester",
          "displayValue": "Tester",
          "hash": "24685f0afb7f0706f7d48d22e35a4fb755285cb4d3e1b9ff9b1bfee5c9ab10ab",
          "templateKeys": []
        }
      },
      "dynamicId": "8018d03c-2168-4686-a25d-0a174b161bad",
      "version": "0.1.0",
      "operand": "AND",
      "groupId": "5afa1869-c045-4703-97ee-72619d28c0db",
      "branchId": "bc23e637-6900-4942-bed0-d36b3a407b1c",
      "sequence": 0
    }
  ],
  "metaActions": [
    {
      "actionId": "9d93dd01-77bb-4f75-8521-80e46407e6c6",
      "version": "0.1.14",
      "skipOnFailure": true,
      "valuesMap": {
        "bodyType": {
          "inputParameterId": "f45c263f-ef7d-4f5e-9136-ba8c94a71bc8",
          "bindName": "bodyType",
          "value": "text/plain",
          "displayValue": "Plaintext",
          "hash": "86208ba21d6858b178d0edf87d552414e59af345332f1e863381023daa207b62",
          "templateKeys": []
        },
        "sendTo": {
          "inputParameterId": "29ab12e1-02cb-452f-82a5-9c433a07884c",
          "bindName": "sendTo",
          "value": "raymundo.hernandez@bettercloud.com",
          "displayValue": "raymundo.hernandez@bettercloud.com",
          "hash": "440015ed325bcbe1e8fa498cc09b30e05dc8699ab49723a537ede7ed44baa52",
          "templateKeys": []
        },
        "emailBody": {
          "inputParameterId": "d6bcd3b5-656f-453e-a5f1-9f8734b11088",
          "bindName": "emailBody",
          "value": "Email:{{a326dec5-34ab-43d7-9b34-37e2039cabfe}}\nDepartment:{{0f74b12b-9a5a-4b84-85ad-d8ac194f36af}}",
          "displayValue": "Email:{{event.google.Google|Simplysqueeze.me.User.PrimaryEmail}}\nDepartment:{{event.google.Google|Simplysqueeze.me.User.Department}}",
          "hash": "9be5969a9b6065320f55246e8d236832639e5ba5a489694d0b38d79bc72b6498",
          "templateKeys": []
        },
        "subject": {
          "inputParameterId": "ec00cb05-0482-4d83-95b1-98e2f71a2058",
          "bindName": "subject",
          "value": "1aRay-Manysections,onecondition.DepartmentisQA",
          "displayValue": "1aRay-Manysections,onecondition.DepartmentisQA",
          "hash": "ecff02c191db7df9c469a700611282d0e6d8d9d54e5b63458d23da4eabe60603",
          "templateKeys": []
        },
        "integrationId": {
          "inputParameterId": "b6bea60c-8dc9-4bd9-a950-d5f8aa2c6a60",
          "bindName": "integrationId",
          "value": "6b6a4260-098c-11ec-8c5d-335d234c83ed",
          "displayValue": "BetterCloud",
          "hash": "44c242d0bc2ce5e8e816cfc717c380a6b3be80669a07b618c113d32f98fb7e0d",
          "templateKeys": []
        }
      },
      "dynamicId": "02b271f3-9a67-4ee9-b209-0ac4d34ac993",
      "disabled": false,
      "branchId": "9a180115-a86c-401a-9a87-d08a9b341048",
      "sequence": 0
    }
  ],
  "sections": [
    {
      "sectionId": "86fa66a6-67a2-4c89-b77a-5df77d82aaaf",
      "sequence": 10000
    }
  ],
  "branches": [
    {
      "type": "if",
      "branchId": "9a180115-a86c-401a-9a87-d08a9b341048",
      "sectionId": "86fa66a6-67a2-4c89-b77a-5df77d82aaaf",
      "sequence": 0
    }
  ]
};

export default workflowMetadata;
