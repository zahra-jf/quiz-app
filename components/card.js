const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="../dist/Bootstrap/bootstrap.min.css" />
    <link rel="stylesheet" href="../dist/Bootstrap/bootstrap-icons.min.css" />
     <link rel="stylesheet" href="../components/card.css" />

     
       <div class="card flipCard col-3">
        <div class="content">
          <div class="front card">
            <img
              src="../imgs/js.png"
              class="card-img-top"
              alt="React Logo"
            />
            <div class="card-body">
              <h5 class="card-title"></h5>
              <div class="cont-icons">
               
              </div>
            
            </div>
          </div>
          <div class="back card">
            <div class="card-body">
              <h5 class="card-duration"></h5>
              <p></p>
            </div>
          </div>
          
        </div>
         <div class="icons"
                  ><span class="icon-text">level of difficulty :</span
                  ><i class="bi bi-0-circle-fill"></i
                  ><i class="bi bi-1-circle-fill"></i
                  ><i class="bi bi-2-circle-fill"></i
                ></div>
        <a href="#" class="btn btn-primary">start quiz</a>
      </div> 
        
  `;

class card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export { card };


