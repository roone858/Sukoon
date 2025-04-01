const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="profile-card">
        <h3 className="text-lg font-medium mb-4">إعدادات الحساب</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تغيير كلمة المرور
            </label>
            <button className="btn-secondary w-full">تغيير كلمة المرور</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              إعدادات الإشعارات
            </label>
            <button className="btn-secondary w-full">تخصيص الإشعارات</button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اللغة
            </label>
            <select className="w-full p-2 border rounded-lg">
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab; 