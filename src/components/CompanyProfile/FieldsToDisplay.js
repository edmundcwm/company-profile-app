const shareholders = [
  {
    label: 'Name',
    value: 'shareholder_name',
    component: 'p'
  },
  {
    label: 'Percentage',
    value: 'shareholder_percentage',
    component: 'p'
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
    type: 'text'
  }
];

export const ProfileFields = {
  shareholders,
  employees
};
