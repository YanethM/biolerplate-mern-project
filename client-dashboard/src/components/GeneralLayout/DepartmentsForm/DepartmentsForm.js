import React, { useEffect, useState } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import "./DepartmentsForm.scss";

export const DepartmentsForm = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentosFiltrados, setDepartamentosFiltrados] = useState([]);
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueMunicipio, setSearchValueMunicipio] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchOpenMunicipio, setIsSearchOpenMunicipio] = useState(false);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchOpenMunicipio = () => {
    setIsSearchOpenMunicipio(true);
  };

  useEffect(() => {
    const filteredDepartments = departamentos.filter((departamento) =>
      departamento.text.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setDepartamentosFiltrados(filteredDepartments);
  }, [departamentos, searchValue]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchValue("");
    setDepartamentosFiltrados(departamentos); // Restablecer la lista de departamentos filtrados a la lista completa
  };

  const handleSearchCloseMunicipio = () => {
    setIsSearchOpenMunicipio(false);
    setSearchValueMunicipio("");
    setMunicipiosFiltrados(municipios); // Restablecer la lista de departamentos filtrados a la lista completa
  };

  useEffect(() => {
    const filteredMunicipios = municipios.filter((municipio) =>
      municipio.text
        .toLowerCase()
        .startsWith(searchValueMunicipio.toLowerCase())
    );
    setMunicipiosFiltrados(filteredMunicipios);
  }, [municipios, searchValueMunicipio]);

  const handleSearchChange = (_, { searchQuery }) => {
    setSearchValue(searchQuery);
    const filteredDepartments = departamentos.filter((departamento) =>
      departamento.text.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setDepartamentosFiltrados(filteredDepartments);
  };
  const handleSearchChangeMunicipios = (_, { searchQuery }) => {
    setSearchValueMunicipio(searchQuery);
    const filteredMunicipios = municipios.filter((municipio) =>
      municipio.text.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setMunicipiosFiltrados(filteredMunicipios);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchValue) {
        const filteredDepartments = departamentos.filter((departamento) =>
          departamento.text.toLowerCase().startsWith(searchValue.toLowerCase())
        );
        if (filteredDepartments.length) {
          setDepartamentoSeleccionado(filteredDepartments[0].value);
          fetchMunicipios(filteredDepartments[0].value);
        }
      } else {
        setDepartamentoSeleccionado("");
        setMunicipioSeleccionado("");
      }
    }
  };

  const handleKeyDownMunicipio = (event) => {
    if (event.key === "Enter") {
      if (searchValueMunicipio) {
        const filteredMunicipios = municipios.filter((municipio) =>
          municipio.text
            .toLowerCase()
            .startsWith(searchValueMunicipio.toLowerCase())
        );
        if (filteredMunicipios.length) {
          setMunicipioSeleccionado(filteredMunicipios[0].value);
        }
      } else {
        setMunicipioSeleccionado("");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        const data = await response.json();
        const departamentos = Array.from(
          new Set(data.map((municipio) => municipio.departamento))
        ).map((departamento) => ({
          key: departamento,
          value: departamento,
          text: departamento,
        }));
        departamentos.sort((a, b) => a.text.localeCompare(b.text));

        setDepartamentos(departamentos);
        setDepartamentosFiltrados(departamentos);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };
    fetchData();
  }, []);

  const fetchMunicipios = async (departamento) => {
    if (departamento !== departamentoSeleccionado) {
      try {
        const response = await fetch(
          `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${departamento}`
        );
        const data = await response.json();

        if (
          Array.isArray(data) &&
          data.length > 0 &&
          data[0].c_digo_dane_del_municipio
        ) {
          const municipios = data.map((municipio) => ({
            key: municipio.c_digo_dane_del_municipio,
            value: municipio.c_digo_dane_del_municipio,
            text: municipio.municipio,
          }));
          municipios.sort((a, b) => a.text.localeCompare(b.text));
          setMunicipios(municipios);
          setDepartamentoSeleccionado(departamento);
        } else {
          console.error(
            "Error: Los datos de municipios no tienen la estructura esperada"
          );
          setMunicipios([]);
        }
      } catch (error) {
        console.error("Error al obtener los municipios:", error);
        setMunicipios([]);
      }
    }
  };
  useEffect(() => {
    console.log(municipioSeleccionado);
  }, [municipioSeleccionado]);
  return (
    <>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Selecciona un departamento:</label>
          <Dropdown
            placeholder="Seleccionar"
            fluid
            selection
            options={departamentosFiltrados}
            value={departamentoSeleccionado}
            search
            searchQuery={searchValue}
            onSearchChange={handleSearchChange}
            onChange={(_, { value }) => {
              setDepartamentosFiltrados(departamentos);
              fetchMunicipios(value);
            }}
            open={isSearchOpen}
            onOpen={handleSearchOpen}
            onClose={handleSearchClose}
            className="dropdown-input"
            searchInput={
              <Input
                autoComplete="off"
                onKeyDown={handleKeyDown}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Selecciona un municipio:</label>
          <Dropdown
            placeholder="Seleccionar"
            fluid
            selection
            options={municipiosFiltrados}
            value={municipioSeleccionado}
            search
            searchQuery={searchValueMunicipio}
            onSearchChange={handleSearchChangeMunicipios}
            onChange={(_, { value }) => {
              setMunicipiosFiltrados([]);
              setMunicipioSeleccionado(value);
            }}
            open={isSearchOpenMunicipio}
            onOpen={handleSearchOpenMunicipio}
            onClose={handleSearchCloseMunicipio}
            className="dropdown-input"
            searchInput={
              <Input
                autoComplete="off"
                onKeyDown={handleKeyDownMunicipio}
                value={searchValueMunicipio}
                onChange={(e) => setSearchValueMunicipio(e.target.value)}
              />
            }
            disabled={!departamentoSeleccionado}
          />
        </Form.Field>
      </Form.Group>
    </>
  );
};
