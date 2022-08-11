const ListItem = ({ country, onClick}) => {
  return (
    <div key={country.cca2}>
      {country.name.common}
      <button onClick={onClick}>show</button>
    </div>
  );
};

export default ListItem;
