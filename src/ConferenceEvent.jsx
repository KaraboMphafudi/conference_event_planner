import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from './venueSlice';
import { incrementAvQuantity, decrementAvQuantity } from './avSlice';
import { toggleMealSelection } from './mealsSlice';
import TotalCost from './TotalCost';
import './ConferenceEvent.css';

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const remainingAuditoriumQuantity = venueItems && venueItems.length > 0
    ? 3 - (venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)")?.quantity || 0)
    : 3;

  // Calculate totals
  const venueTotal = venueItems ? venueItems.reduce((total, item) => total + (item.cost * item.quantity), 0) : 0;
  const avTotal = avItems ? avItems.reduce((total, item) => total + (item.cost * item.quantity), 0) : 0;
  const mealsTotal = mealsItems ? mealsItems.reduce((total, item) => {
    if (item.selected) return total + (item.cost * numberOfPeople);
    return total;
  }, 0) : 0;

  const totalCosts = {
    venue: venueTotal,
    av: avTotal,
    meals: mealsTotal,
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    
    if (venueItems) {
      venueItems.forEach((item) => {
        if (item.quantity > 0) {
          items.push({ ...item, type: "venue" });
        }
      });
    }
    
    if (avItems) {
      avItems.forEach((item) => {
        if (item.quantity > 0) {
          items.push({ ...item, type: "av" });
        }
      });
    }
    
    if (mealsItems) {
      mealsItems.forEach((item) => {
        if (item.selected) {
          items.push({ ...item, type: "meals", numberOfPeople });
        }
      });
    }
    
    return items;
  };

  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    return (
      <div className="display_box1">
        {items.length === 0 && <p>No items selected</p>}
        {items.length > 0 && (
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>
                    {item.type === "meals" 
                      ? `${item.numberOfPeople} people` 
                      : item.quantity}
                  </td>
                  <td>
                    ${item.type === "meals" 
                      ? item.cost * item.numberOfPeople 
                      : item.cost * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  const handleToggleItems = () => {
    setShowItems(!showItems);
  };

  const navigateToProducts = (idType) => {
    if (idType === '#venue' || idType === '#addons' || idType === '#meals') {
      if (showItems) {
        setShowItems(false);
      }
    }
  };

  const handleAddToCart = (index) => {
    if (!venueItems[index]) return;
    if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index] && venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>Add-ons</a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>Meals</a>
          </div>
          <button className="details_button" onClick={handleToggleItems}>
            Show Details
          </button>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* VENUE SECTION */}
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems && venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className="btn-warning"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        &ndash;
                      </button>
                      <span className="selected_count">{item.quantity}</span>
                      <button
                        className="btn-success"
                        onClick={() => handleAddToCart(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotal}</div>
            </div>

            {/* ADD-ONS SECTION */}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1>Add-ons Selection</h1>
              </div>
              <div className="addons_selection">
                {avItems && avItems.map((item, index) => (
                  <div className="av_data venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="addons_btn">
                      <button
                        className="btn-warning"
                        onClick={() => dispatch(decrementAvQuantity(index))}
                      >
                        &ndash;
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="btn-success"
                        onClick={() => dispatch(incrementAvQuantity(index))}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${avTotal}</div>
            </div>

            {/* MEALS SECTION */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="input-container">
                <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                <input
                  type="number"
                  className="input_box5"
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setNumberOfPeople(isNaN(value) || value < 1 ? 1 : value);
                  }}
                  min="1"
                />
              </div>
              <div className="meal_selection">
                {mealsItems && mealsItems.map((item, index) => (
                  <div className="meal_item" key={index}>
                    <div className="inner">
                      <input
                        type="checkbox"
                        id={`meal_${index}`}
                        checked={item.selected}
                        onChange={() => dispatch(toggleMealSelection(index))}
                      />
                      <label htmlFor={`meal_${index}`}>{item.name}</label>
                    </div>
                    <div className="meal_cost">${item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${mealsTotal}</div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCosts}
              handleClick={handleToggleItems}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;