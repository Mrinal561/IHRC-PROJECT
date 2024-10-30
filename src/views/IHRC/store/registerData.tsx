export interface Register {
    act_name: string;
    register_name: string;
    forms: string;
    type_of_act: string;
}


export const registers: Register[] = [
    {
      act_name: 'Equal Remuneration Act, 1976 & Equal Remuneration Rules, 1976, Central Rule',
      register_name: 'Wage Register',
      forms: 'Form B',
      type_of_act: 'Central'
    },
    {
      act_name: 'Payment of Bonus Act 1965 & Payment of Bonus Rules 1975, Central Rule',
      register_name: 'Computation of Allocable Surplus',
      forms: 'Form A',
      type_of_act: 'Central'
      
    },
    {
      act_name: 'Child Labour (Prohibition and Regulation) Act, 1986 & Child Labour (Prohibition and Regulation) Rules, 1988, Central Rule',
      register_name: 'Child Labour (Prohibition and Regulation) Act, 1986 & Child Labour (Prohibition and Regulation) Rules, 1988',
      forms: 'Form A-Rule 16(1)',
      type_of_act: 'Central'
      
    },
    {
      act_name: 'Maternity Benefit Act, 1961, Maharashtra Rule',
      register_name: 'Maternity Benefit Register',
      forms: 'Form 10 Rule 12(1)',
      type_of_act: 'State'
      
    },
    {
      act_name: 'Maharashtra workmen Minimum House-Rent Allowance Act, 1983, Maharashtra Rule ',
      register_name: 'House Rent allowance',
      forms: 'Form A',
      type_of_act: 'State'
      
    }
  ]