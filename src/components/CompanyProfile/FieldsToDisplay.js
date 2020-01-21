const shareholders = [
  {
    label: 'Name',
    value: 'shareholder_name',
    component: 'p',
    type: 'text'
  },
  {
    label: 'Percentage',
    value: 'shareholder_percentage',
    component: 'p',
    type: 'number'
  }
];

const employees = [
  {
    label: 'Name',
    value: 'employee_name',
    component: 'p',
    type: 'text'
  },
  {
    label: 'Email',
    value: 'employee_email',
    component: 'p',
    type: 'email'
  },
  {
    label: 'Contract',
    value: 'employee_contract_title',
    component: 'p',
    link: 'employee_contract_link',
    type: 'file'
  }
];

export const ProfileFields = {
  shareholders,
  employees
};
