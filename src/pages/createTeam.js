export default function Component() {
  
    addCompetitorField = () => {
      let CompetitorsFields = document.getElementById("Competitors-fields")
      var div = document.createElement('div')
      div.innerHTML = "<div>"+
                      "<input type = 'text'></input>"+
                      "<button type = 'button'>-</button>"+
                      "<button type = 'button'>+</button>"+
                      "</div>"
      CompetitorsFields.appendChild(div)
    }
    return (
    <div>
      <div className="row">
        <div className="column">
          <h1>Crea un nuevo equipo</h1>
          <h3>Vive nuevas experiencias</h3>
          <br/>
          <hr></hr>
          <br/>
          <h5>¿Cómo se llaman?</h5>
          <input type="text"></input>
          <h5>¿Quiénes son?</h5>
          <div id="competitors-fields">

          </div>
          <button>Crear equipo</button>
          <br/>
          <button>Cancelar</button>
        </div>
        <div className="column">
          <img alt="Picture"></img>
        </div>
      </div>
    </div>
    )
}