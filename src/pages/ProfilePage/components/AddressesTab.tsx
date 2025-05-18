interface Address {
  id: number;
  title: string;
  address: string;
  isDefault: boolean;
}

interface AddressesTabProps {
  addresses: Address[];
}

const AddressesTab = ({ addresses }: AddressesTabProps) => {
  return (
    <div className="space-y-6">
      {addresses?.map((address: Address) => (
        <div key={address.id} className="profile-card">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">{address.title}</h3>
              {address.isDefault && (
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                  افتراضي
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600">{address.address}</p>
        </div>
      ))}
      <button className="btn-primary w-full">إضافة عنوان جديد</button>
    </div>
  );
};

export default AddressesTab; 