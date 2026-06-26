import type { TranslationDict } from './en'

const vi: TranslationDict = {
  // App
  appName: 'Tài chính',

  // Navigation
  navDashboard: 'Bảng điều khiển',
  navTransactions: 'Giao dịch',
  navWallets: 'Ví',
  navCategories: 'Danh mục',
  navBudgets: 'Ngân sách',
  navProfile: 'Hồ sơ',
  navHome: 'Trang chủ',

  // Route titles (Header)
  routeOverview: 'Tổng quan',
  routeDashboard: 'Bảng điều khiển',
  routeTransactions: 'Giao dịch',
  routeWallets: 'Ví',
  routeCategories: 'Danh mục',
  routeBudgets: 'Ngân sách',
  routeProfile: 'Hồ sơ',

  // Header
  switchToLight: 'Chuyển sang chế độ sáng',
  switchToDark: 'Chuyển sang chế độ tối',
  headerLogout: 'Đăng xuất',

  // Profile Page
  profileTitle: 'Hồ sơ',
  profileSubtitle: 'Quản lý thông tin cá nhân và tùy chọn của bạn',
  memberSince: 'Thành viên từ',

  // Profile Form
  editProfile: 'Chỉnh sửa hồ sơ',
  changePhoto: 'Đổi ảnh',
  photoHint: 'PNG hoặc JPG. Tối đa 5MB.',
  labelName: 'Tên',
  placeholderName: 'Họ và tên của bạn',
  labelEmail: 'Email',
  placeholderEmail: 'email@cua-ban.com',
  labelPreferredCurrency: 'Tiền tệ ưa thích',
  labelLocale: 'Ngôn ngữ',
  optionEnglish: 'English (US)',
  optionVietnamese: 'Tiếng Việt (VN)',
  saveChanges: 'Lưu thay đổi',
  nameMinError: 'Tên phải có ít nhất 2 ký tự',
  nameMaxError: 'Tên không được vượt quá 50 ký tự',
  emailInvalidError: 'Vui lòng nhập địa chỉ email hợp lệ',

  // Stats Overview
  statsOverview: 'Tổng quan thống kê',
  totalTransactions: 'Tổng giao dịch',
  totalIncome: 'Tổng thu nhập',
  totalExpenses: 'Tổng chi tiêu',
  monthsActive: 'Số tháng hoạt động',
  month: 'tháng',
  months: 'tháng',

  // Transaction Form
  newTransaction: 'Giao dịch mới',
  income: 'Thu nhập',
  expense: 'Chi tiêu',
  transfer: 'Chuyển khoản',
  labelAmount: 'Số tiền',
  amountRequired: 'Vui lòng nhập số tiền',
  amountPositive: 'Số tiền phải lớn hơn 0',
  labelCategory: 'Danh mục',
  categoryRequired: 'Vui lòng chọn danh mục',
  labelDate: 'Ngày',
  dateRequired: 'Vui lòng chọn ngày',
  labelNote: 'Ghi chú',
  noteOptional: '(không bắt buộc)',
  noteMaxError: 'Ghi chú không được vượt quá 500 ký tự',
  placeholderNote: 'Thêm ghi chú...',
  labelWallet: 'Ví',
  labelFromWallet: 'Từ ví',
  labelToWallet: 'Đến ví',
  selectWallet: 'Chọn ví',
  selectDestination: 'Chọn ví đích',
  selectDifferentWallet: 'Vui lòng chọn ví đích khác',
  addTransaction: 'Thêm giao dịch',
  addIncome: 'Thêm thu nhập',
  addExpense: 'Thêm chi tiêu',
  addTransfer: 'Thêm chuyển khoản',
  ariaAddTransaction: 'Thêm giao dịch',

  // Transaction List
  noTransactions: 'Chưa có giao dịch nào',
  noTransactionsDesc: 'Bắt đầu bằng cách thêm giao dịch đầu tiên của bạn.',
  searchPlaceholder: 'Tìm kiếm giao dịch...',

  // Transaction filters
  filterAll: 'Tất cả',
  filterIncome: 'Thu nhập',
  filterExpense: 'Chi tiêu',
  filterTransfer: 'Chuyển khoản',
  filterClear: 'Xóa bộ lọc',

  // Dashboard
  dashboardTitle: 'Bảng điều khiển',
  dashboardSubtitle: 'Tổng quan tài chính của bạn',
  netWorth: 'Tổng tài sản',
  incomeThisMonth: 'Thu nhập tháng này',
  expensesThisMonth: 'Chi tiêu tháng này',
  savings: 'Tiết kiệm',
  vsLastMonth: 'so với tháng trước',

  // Dashboard - Empty state
  noDataTitle: 'Không có dữ liệu tháng này',
  noDataDesc: 'Thêm giao dịch để xem tổng quan tài chính của bạn.',

  // Recent Transactions
  recentTransactions: 'Giao dịch gần đây',
  viewAll: 'Xem tất cả',

  // Budget
  budgetOverview: 'Tổng quan ngân sách',
  budgetRemaining: 'còn lại',
  budgetOverspent: 'vượt chi',

  // Categories page
  categoriesTitle: 'Danh mục',
  categoriesSubtitle: 'Quản lý danh mục giao dịch của bạn',

  // Budgets page
  budgetsTitle: 'Ngân sách',
  budgetsSubtitle: 'Thiết lập và theo dõi hạn mức chi tiêu của bạn',

  // Wallets page
  totalBalance: 'Tổng số dư',
  walletsTitle: 'Ví',

  // Currency options
  currencyUSD: 'USD ($)',
  currencyEUR: 'EUR (€)',
  currencyVND: 'VND (₫)',

  // Profile card
  userCurrency: 'Tiền tệ',
  accountCreated: 'Thành viên từ',

  // Budget card
  monthlyBudget: 'Ngân sách tháng',
  weeklyBudget: 'Ngân sách tuần',
  spent: 'đã chi',
  of: 'trên',

  // General
  loading: 'Đang tải...',
  error: 'Đã xảy ra lỗi',
  retry: 'Thử lại',
  cancel: 'Hủy',
  confirm: 'Xác nhận',
  close: 'Đóng',
  back: 'Quay lại',

  // Income/Expense chart
  incomeVsExpenses: 'Thu nhập vs Chi tiêu',
  spendingByCategory: 'Chi tiêu theo danh mục',
}

export default vi