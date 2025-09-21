

import React, { useState, useEffect } from "react";
import styles from "./AddEditTripModal.module.css";

const AddEditTripModal = ({
  isOpen,
  onClose,
  onSave,
  tripToEdit,
  isSaving,
}) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    price: "",
    totalSeats: "",
    imageUrl: null,
  });

 
  useEffect(() => {
    if (tripToEdit) {
      setFormData({
        source: tripToEdit.source,
        destination: tripToEdit.destination,
        date: new Date(tripToEdit.date).toISOString().split("T")[0], 
        time: tripToEdit.time,
        price: tripToEdit.price,
        totalSeats: tripToEdit.totalSeats,
        imageUrl: tripToEdit.imageUrl,
      });
    } else {
     
      setFormData({
        source: "",
        destination: "",
        date: "",
        time: "",
        price: "",
        totalSeats: "",
        imageUrl: null,
      });
    }
  }, [tripToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl") {
      setFormData((prev) => ({ ...prev, imageUrl: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{tripToEdit ? "Edit Trip" : "Add New Trip"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Source"
            required
          />
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            required
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            name="totalSeats"
            type="number"
            value={formData.totalSeats}
            onChange={handleChange}
            placeholder="Total Seats"
            required
          />
          <label>Trip Image</label>
          <input
            name="imageUrl"
            type="file"
            onChange={handleChange}
            required={!tripToEdit}
          />
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTripModal;









// import React, { useState, useEffect } from "react";
// import styles from "./AddEditTripModal.module.css";

// const AddEditTripModal = ({
//   isOpen,
//   onClose,
//   onSave,
//   tripToEdit,
//   isSaving,
// }) => {
//   const [formData, setFormData] = useState({
//     source: "",
//     destination: "",
//     date: "",
//     time: "",
//     price: "",
//     totalSeats: "",
//     imageUrl: null, // can be File or String
//   });

//   useEffect(() => {
//     if (tripToEdit) {
//       setFormData({
//         source: tripToEdit.source,
//         destination: tripToEdit.destination,
//         date: new Date(tripToEdit.date).toISOString().split("T")[0],
//         time: tripToEdit.time,
//         price: tripToEdit.price,
//         totalSeats: tripToEdit.totalSeats,
//         imageUrl: tripToEdit.imageUrl, // string (existing URL)
//       });
//     } else {
//       setFormData({
//         source: "",
//         destination: "",
//         date: "",
//         time: "",
//         price: "",
//         totalSeats: "",
//         imageUrl: null,
//       });
//     }
//   }, [tripToEdit, isOpen]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "imageUrl") {
//       setFormData((prev) => ({ ...prev, imageUrl: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("source", formData.source);
//     fd.append("destination", formData.destination);
//     fd.append("date", formData.date);
//     fd.append("time", formData.time);
//     fd.append("price", formData.price);
//     fd.append("totalSeats", formData.totalSeats);

//     // Only append file if new one selected
//     if (formData.imageUrl instanceof File) {
//       fd.append("imageUrl", formData.imageUrl);
//     }

//     // Pass FormData + edit ID if editing
//     onSave(fd, tripToEdit?._id);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <h2>{tripToEdit ? "Edit Trip" : "Add New Trip"}</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             name="source"
//             value={formData.source}
//             onChange={handleChange}
//             placeholder="Source"
//             required
//           />
//           <input
//             name="destination"
//             value={formData.destination}
//             onChange={handleChange}
//             placeholder="Destination"
//             required
//           />
//           <input
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="time"
//             type="time"
//             value={formData.time}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="price"
//             type="number"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="Price"
//             required
//           />
//           <input
//             name="totalSeats"
//             type="number"
//             value={formData.totalSeats}
//             onChange={handleChange}
//             placeholder="Total Seats"
//             required
//           />

//           <label>Trip Image</label>
//           <input
//             name="imageUrl"
//             type="file"
//             onChange={handleChange}
//             required={!tripToEdit} // required only when adding
//           />

//           {/* Show current image if editing */}
//           {tripToEdit &&
//             typeof formData.imageUrl === "string" &&
//             formData.imageUrl && (
//               <p>
//                 Current Image:{" "}
//                 <a href={formData.imageUrl} target="_blank" rel="noreferrer">
//                   View
//                 </a>
//               </p>
//             )}

//           <div className={styles.buttonGroup}>
//             <button
//               type="button"
//               onClick={onClose}
//               className={styles.cancelButton}
//               disabled={isSaving}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={styles.saveButton}
//               disabled={isSaving}
//             >
//               {isSaving ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEditTripModal;
