//handle company profile documents upload
function companyProfileDocs(employees) {
  let empContracts = [];
  employees.forEach(({ employee_contract }, index) => {
    console.log(employee_contract);
    // console.log(employee_contract instanceof File);
    if (employee_contract instanceof File) {
      //ensure that an object is present and not an array
      empContracts.push({
        file: employee_contract,
        meta: index
      });
    }
  });

  console.log(empContracts);
  return empContracts;
}

export const prepareAttachments = {
  companyProfileDocs
};
