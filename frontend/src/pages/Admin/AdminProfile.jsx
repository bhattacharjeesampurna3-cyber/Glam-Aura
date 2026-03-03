function AdminProfile(){

  const admin = {
    name:"Sampurna Bhattacharjee",
    position:"Product Manager",
    salary:"₹12,00,000 / year"
  };

  return(

    <div className="admin-profile">

      <h1>Admin Profile</h1>

      <p>Name: {admin.name}</p>
      <p>Position: {admin.position}</p>
      <p>Salary: {admin.salary}</p>

    </div>

  );

}

export default AdminProfile;