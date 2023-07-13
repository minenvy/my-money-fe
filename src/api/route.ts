const routes = {
  // User
  changeProfileUser: '/user/change-profile',
  getUserByToken: '/user/get-by-token',
  getUserById: '/user/get-by-id',
  logout: '/user/logout',
  login: '/user/login',
  register: '/user/register',
  checkBlock: '/user/check-block',
  checkFollow: '/user/check-follow',
  changePassword: '/user/change-password',
  followUser: '/user/follow',
  getProposers: '/user/get-proposers',
  // Wallet
  addWallet: '/wallet/add',
  getAllWallet: '/wallet/get-all-wallet',
  // Image
  extractImage: '/image/extract',
  uploadImage: '/image/upload',
  // Notification
  getNotification: '/notification/get-infinite',
  readNotification: '/notification/read',
  // Money Type
  getAllMoneyTypes: '/custom-money-type/get-all',
  // Transaction
  getTransactionsInMonth: '/transaction/get-in-month',
  getTransactionsInYear: '/transaction/get-in-year',
  getRecentTransactions: '/transaction/recent',
  getInfiniteTransactions: '/transaction/get-infinite',
  getDraftTransactions: '/transaction/draft',
  getTransactionById: '/transaction/get-by-id',
  editTransaction: '/transaction/edit',
  getSeparateInMonth: '/transaction/get-separate-in-month',
  // Budget
  getDayExpense: '/budget/get-day-expense',
  getInfiniteBudgets: '/budget/get-infinite',
  addBudget: '/budget/add',
  deleteBudget: '/budget/delete',
  // Report
  getMonthReports: '/report/month',
  getYearReports: '/report/year',
}

export default routes
