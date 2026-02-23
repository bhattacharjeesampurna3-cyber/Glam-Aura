const UploadPhoto = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Upload Your Photo</h2>

      <div className="card p-4 shadow-lg">
        <input type="file" className="form-control mb-3" />
        <button className="btn btn-luxury w-100">
          Analyze & Recommend
        </button>
      </div>
    </div>
  );
};

export default UploadPhoto;
