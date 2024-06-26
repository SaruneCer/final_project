import { Button } from "./Button";
import { useState, useEffect } from "react";
import "../styles/edit-info-modal.css";

export function EditInfoModal({
  dataInfo,
  onSave,
  onClose,
  existingCategories = [],
  isAddingCondition,
  conditionToEdit,
}) {
  const [editedInfo, setEditedInfo] = useState(dataInfo);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isAddingCondition) {
      setEditedInfo({ conditions: "", notes: "" });
    } else if (conditionToEdit) {
      setEditedInfo(conditionToEdit);
    } else {
      setEditedInfo(dataInfo);
    }
  }, [dataInfo, isAddingCondition, conditionToEdit]);

  const handleChange = (e, parentKey = null) => {
    const { name, value } = e.target;
    if (parentKey) {
      setEditedInfo((prevInfo) => ({
        ...prevInfo,
        [parentKey]: {
          ...prevInfo[parentKey],
          [name]: value,
        },
      }));
    } else {
      setEditedInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    onSave(editedInfo);
    setIsEditing(false);
  };

  const renderFormFields = (data, parentKey = null) => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      if (key === "_id" || key === "medicalHistory" || key === "category") {
        return null;
      }
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        return (
          <div key={key} className="nested-form-group">
            {renderFormFields(value, key)}
          </div>
        );
      }

      return (
        <div className="input-wrapper" key={key}>
          <label htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <input
            type={typeof value === "number" ? "number" : "text"}
            id={key}
            name={key}
            value={value}
            onChange={(e) => handleChange(e, parentKey)}
          />
        </div>
      );
    });
  };

  return (
    <div className="modal">
      <div className={`form-container ${isEditing ? "is-editing" : ""}`}>
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <form>
          <h2 className="modal-h2">
            {isAddingCondition
              ? "ADD CONDITION"
              : conditionToEdit
              ? "EDIT CONDITION"
              : "EDIT INFO"}
          </h2>
          {isAddingCondition || conditionToEdit ? (
            <>
              <div className="input-wrapper">
                <label htmlFor="conditions">Condition:</label>
                <input
                  type="text"
                  id="conditions"
                  name="conditions"
                  value={editedInfo.conditions || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="notes">Notes:</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={editedInfo.notes || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </>
          ) : (
            renderFormFields(editedInfo)
          )}
          {existingCategories.length > 0 && (
            <div className="input-wrapper">
              <select
                id="category"
                name="category"
                value={editedInfo.category || ""}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select Category</option>
                {existingCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="addNewCategory">Add New Category</option>
              </select>
              {editedInfo.category === "addNewCategory" && (
                <input
                  type="text"
                  placeholder="New category name"
                  value={editedInfo.newCategory || ""}
                  onChange={(e) =>
                    setEditedInfo((prevInfo) => ({
                      ...prevInfo,
                      newCategory: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          )}
          <div className="modal-buttons">
            <Button buttonText="Save" onClick={handleSave} />
            <Button buttonText="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
}
