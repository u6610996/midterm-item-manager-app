import { useState } from 'react';
import './item-manager-app.css'; // Import CSS

// Import รูปภาพ (ใช้ ../ เพื่อถอยออกจาก folder components ไปหา assets)
import deleteIcon from '../assets/delete.svg';
import stationIcon from '../assets/ink_pen.svg';
import kitchenIcon from '../assets/flatware.svg';
import applianceIcon from '../assets/electrical_services.svg';

const ItemManagerApp = () => {
  // 1. State ข้อมูล Items เริ่มต้น
  const [items, setItems] = useState([
    { id: 1, name: "Color Pencil set 32", category: "Stationary", price: 11.00 },
    { id: 2, name: "Small Kitty Lamp", category: "Appliance", price: 44.00 },
    { id: 3, name: "Knife Set 4pcs", category: "Kitchenware", price: 23.11 },
  ]);

  // 2. State สำหรับ Form Input
  const [newItem, setNewItem] = useState({
    name: '',
    category: '', // ไม่มี Default Category [cite: 94]
    price: ''
  });

  // 3. State สำหรับ Error Message
  const [error, setError] = useState('');

  // ฟังก์ชันแปลง Category เป็น Icon [cite: 108-111]
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Stationary': return <img src={stationIcon} alt="Stationary" style={{width: '24px'}} />;
      case 'Kitchenware': return <img src={kitchenIcon} alt="Kitchenware" style={{width: '24px'}} />;
      case 'Appliance': return <img src={applianceIcon} alt="Appliance" style={{width: '24px'}} />;
      default: return category;
    }
  };

  // จัดการ Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // ฟังก์ชัน Add Item พร้อม Validation [cite: 95-104]
  const handleAddItem = () => {
    setError(''); // Reset Error

    const nameVal = newItem.name.trim();
    const catVal = newItem.category;
    const priceVal = parseFloat(newItem.price);

    // Validation 1: Name not empty
    if (!nameVal) {
      setError('Item name must not be empty');
      return;
    }

    // Validation 2: No duplicate name (Case insensitive)
    const isDuplicate = items.some(item => item.name.toLowerCase() === nameVal.toLowerCase());
    if (isDuplicate) {
      setError('Item must not be duplicated');
      return;
    }

    // Validation 3: Category selected
    if (!catVal) {
      setError('Please select a category');
      return;
    }

    // Validation 4: Price >= 0
    if (newItem.price === '' || priceVal < 0) {
      setError('Price must not be less than 0');
      return;
    }

    // Add Item: Auto-generate ID [cite: 105]
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    
    const itemToAdd = {
      id: nextId,
      name: nameVal,
      category: catVal,
      price: priceVal // Format display later
    };

    setItems([...items, itemToAdd]);
    
    // Clear Form
    setNewItem({ name: '', category: '', price: '' });
  };

  // ฟังก์ชัน Delete [cite: 107]
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="item-manager-container" style={{ padding: '20px' }}>
      <h2>Item Management</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Render Items */}
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{getCategoryIcon(item.category)}</td>
              <td>{parseFloat(item.price).toFixed(2)}</td>
              <td>
                <img 
                  src={deleteIcon} 
                  alt="Delete" 
                  onClick={() => handleDelete(item.id)}
                  style={{ cursor: 'pointer', width: '20px' }} 
                />
              </td>
            </tr>
          ))}

          {/* Input Form Row [cite: 85] */}
          <tr>
            <td></td>
            <td>
              <input 
                type="text" 
                name="name" 
                value={newItem.name} 
                onChange={handleInputChange} 
              />
            </td>
            <td>
              <select 
                name="category" 
                value={newItem.category} 
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                <option value="Stationary">Stationary</option>
                <option value="Kitchenware">Kitchenware</option>
                <option value="Appliance">Appliance</option>
              </select>
            </td>
            <td>
              <input 
                type="number" 
                name="price" 
                value={newItem.price} 
                onChange={handleInputChange} 
              />
            </td>
            <td>
              <button onClick={handleAddItem}>Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      {/* Error Message [cite: 100] */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
};

export default ItemManagerApp;