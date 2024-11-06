export interface Register {
    act_name: string;
    register_name: string;
    forms: string;
}


export const registers: Register[] = [
    {
      act_name: 'Equal Remuneration Act, 1976 & Equal Remuneration Rules, 1976',
      register_name: 'Wage Register',
      forms: 'Form B'
      
    },
    {
      act_name: 'Payment of Bonus Act 1965 & Payment of Bonus Rules 1975.',
      register_name: 'Computation of Allocable Surplus',
      forms: 'Form A'
      
    },
    {
      act_name: 'Payment of Bonus Act 1965 & Payment of Bonus Rules 1975.',
      register_name: 'Set on and Set off  [Rule 4b]  Form B',
      forms: 'Form B'
      
    },
    {
      act_name: 'Payment of Bonus Act 1965 & Payment of Bonus Rules 1975.',
      register_name: 'Bonus Register - Bonus disbursed ',
      forms: 'Form C Rule 4 (c)'
      
    },
    {
      act_name: 'Child Labour (Prohibition and Regulation) Act, 1986 & Child Labour (Prohibition and Regulation) Rules, 1988',
      register_name: 'Register of children employed or permitted to work ',
      forms: 'Form A-Rule 16(1)'
      
    }
  ]