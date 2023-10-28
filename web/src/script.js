const BASE = "http://localhost:5000/api";

async function getPacientes() {
  try {
    const response = await fetch(`${BASE}/patients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
  }
}

async function getPacientesId(patientId) {
  try {
    const response = await fetch(`${BASE}/patients/${patientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
  }
}
async function displayPatients() {
  try {
    const patients = await getPacientes();
    const tableBody = document.querySelector("#table-body");

    patients.forEach((patient) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${patient.name} ${patient.lastname}</td>
              <td>${patient.medicamentos}</td>
              <td>${patient.ultimaVisita}</td>
              <td class="td-button">
                <button class="info-button" data-patient-id="${patient._id}">Info</button>
                <button class="btn-editar" data-patient-id="${patient._id}">Editar</button>
                <button class="btn-eliminar" data-patient-id="${patient._id}">Eliminar</button>
              </td>
            `;
      tableBody.appendChild(row);
    });

    // Agregar evento click a los botones "Info"
    const infoButtons = document.querySelectorAll(".info-button");
    infoButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        console.log(
          "Click en el botón info" +
            event.target.getAttribute("data-patient-id")
        );
        const patientId = event.target.getAttribute("data-patient-id");
        const patientData = await getPacientesId(patientId);
        // Mostrar los datos del paciente en el modal
        mostrarDatosEnModal(patientData);
      });
    });

    const btnEditarPaciente = document.querySelectorAll(".btn-editar");
    btnEditarPaciente.forEach((button) => {
      button.addEventListener("click", async (event) => {
        console.log("Click en el botón editar");
        const patientId = event.target.getAttribute("data-patient-id");
        const patientData = await getPacientesId(patientId);
        console.log(patientData);
        const verform = document.querySelector(".conteinet-paciente-form");
        verform.style.display = "flex";
        const name = document.querySelector("#name").value =
          patientData.name;
        const lastname = document.querySelector("#lastname").value =
            patientData.lastname;
        const medicamentos = document.querySelector("#medicamento").value =
            patientData.medicamentos;
        const ultimaVisita = document.querySelector("#date").value =
            patientData.ultimaVisita;
        const email = document.querySelector("#email").value =
            patientData.email;
        const phone = document.querySelector("#phone").value =
            patientData.phone;
        const observaciones = document.querySelector("#observations").value =
            patientData.observaciones;
        const age = document.querySelector("#age").value =
            patientData.age;
        const address = document.querySelector("#address").value =
            patientData.address;
        const disease = document.querySelector("#disease").value =
            patientData.disease;
        const btnGuardarPaciente = document.querySelector(".btn-agregar");
        btnGuardarPaciente.style.display = "none";
        const btnEditarPaciente = document.querySelector(".btn-actualizar");
        btnEditarPaciente.style.display = "flex";
        btnEditarPaciente.addEventListener("click", async () => {
            const name = document.querySelector("#name").value;
            const lastname = document.querySelector("#lastname").value;
            const medicamentos = document.querySelector("#medicamento").value;
            const ultimaVisita = document.querySelector("#date").value;
            const email = document.querySelector("#email").value;
            const phone = document.querySelector("#phone").value;
            const observaciones = document.querySelector("#observations").value;
            const age = document.querySelector("#age").value;
            const address = document.querySelector("#address").value;
            const disease = document.querySelector("#disease").value;
    
            const newPatient = {
                name,
                lastname,
                age,
                address,
                phone,
                email,
                disease,
                ultimaVisita,
                medicamentos,
                observaciones,
            };
    
            try {
                const response = await fetch(`${BASE}/patients/${patientId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPatient),
                });
                const data = await response.json();
                console.log(data);
                location.reload();
            } catch (error) {
                console.error("Error al crear paciente:", error);
            }
            });
      });
    });

    const btnEliminarPaciente = document.querySelectorAll(".btn-eliminar");
    btnEliminarPaciente.forEach((button) => {
      button.addEventListener("click", async (event) => {
        console.log("Click en el botón eliminar");
        const patientId = event.target.getAttribute("data-patient-id");
        try {
          const response = await fetch(`${BASE}/patients/${patientId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data);
          location.reload();
        } catch (error) {
          console.error("Error al eliminar paciente:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error al mostrar pacientes:", error);
  }
}

// Función para mostrar los datos del paciente en el modal
function mostrarDatosEnModal(patientData) {
  // Obtener elementos del modal y llenarlos con los datos del paciente
  const modal = document.querySelector(".container-modal");
  const modalContent = modal.querySelector(".content-modal");
  modalContent.querySelector(
    "h2"
  ).textContent = `${patientData.name} ${patientData.lastname}`;
  modalContent.querySelector("p").textContent = `
    Medicamentos: ${patientData.medicamentos},
    Última Visita: ${patientData.ultimaVisita},
    Email: ${patientData.email},
    Teléfono: ${patientData.phone},
    Observaciones: ${patientData.observaciones}, 
    Edad: ${patientData.age} años `;
  // Mostrar el modal
  modal.style.display = "flex";
}

const cerrarmodal = document.querySelector(".modalCerrar");
cerrarmodal.addEventListener("click", () => {
  const modal = document.querySelector(".container-modal");
  modal.style.display = "none";
});

const imprimir = document.querySelector(".imprimirmodal");
imprimir.addEventListener("click", () => {
  window.print();
});

const verform = document.querySelector(".conteinet-paciente-form");

const cerraformPaciente = document.querySelector(".btn-cerrar-form");
cerraformPaciente.addEventListener("click", () => {
  verform.style.display = "none";
});

// Agregar evento click al botón "Crear paciente"
const btnCrearPaciente = document.querySelector(".btn-crear");
btnCrearPaciente.addEventListener("click", async () => {
  verform.style.display = "flex";
});
//Guardar paciente
const btnGuardarPaciente = document.querySelector(".btn-agregar");
btnGuardarPaciente.addEventListener("click", async () => {
  const name = document.querySelector("#name").value;
  const lastname = document.querySelector("#lastname").value;
  const medicamentos = document.querySelector("#medicamento").value;
  const ultimaVisita = document.querySelector("#date").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const observaciones = document.querySelector("#observations").value;
  const age = document.querySelector("#age").value;
  const address = document.querySelector("#address").value;
  const disease = document.querySelector("#disease").value;

  const newPatient = {
    name,
    lastname,
    age,
    address,
    phone,
    email,
    disease,
    ultimaVisita,
    medicamentos,
    observaciones,
  };

  try {
    const response = await fetch(`${BASE}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.error("Error al crear paciente:", error);
  }
});

displayPatients();
