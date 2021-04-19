import "../styles/Card.css";

function Cafecito() {
  return (
      <div style={{paddingBottom: '50px'}}>
        <a
          href="https://cafecito.app/sofiaferro"
          rel="noreferrer"
          target="_blank"
        >
          <img
            srcSet="https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x"
            src="https://cdn.cafecito.app/imgs/buttons/button_5.png"
            alt="Invitame un café en cafecito.app"
          />
        </a>
      </div>
  );
}

export default Cafecito;
