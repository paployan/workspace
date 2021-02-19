import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "@/store";

import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import RichTextEditor from "./RichTextEditor";
import AutoCompleteInput from "./AutoCompleteInput";

type Props = {
  isOpen: boolean;
  id: string | string[];
  onRequestClose: () => void;
};

export const SimpleModal = ({ isOpen, onRequestClose, id }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({
    disabled: true,
    toolbar: false,
  });
  const [formData, setFormData] = useState({
    name: ``,
    description: ``,
    level: ``,
    tags: [],
  });

  useEffect(() => {
    if (isOpen) setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (id) {
      const projects = JSON.parse(localStorage.getItem("projects"));
      const project = projects.filter((x) => x.id === Number(id))[0];
      setFormData({ ...project });
    }
  }, [id]);

  const handleClose = () => {
    setOpen(false);
    if (onRequestClose) onRequestClose();

    setOptions({
      toolbar: false,
      disabled: true
    })
  };

  const clearState = () =>
    setFormData({
      name: ``,
      description: ``,
      level: ``,
      tags: [],
    });

  const handleOnBlur = (e) => {
    const input = e.target;
    const value = !input.value ? "Untitled project" : input.value;

    setFormData((state) => ({
      ...state,
      name: value,
    }));
  };

  const handleOnChange = (e) => {
    const target = e.target;
    setFormData((state) => ({
      ...state,
      name: state.name ? state.name : "Untitled project",
      level: target.value,
    }));
  };

  const handleOnDescriptionChange = (value) =>
    setFormData((state) => ({
      ...state,
      name: state.name ? state.name : "Untitled project",
      description: value,
    }));

  const handleOnTagsChange = (e, value) => {
    setFormData((state) => ({
      ...state,
      name: state.name ? state.name : "Untitled project",
      tags: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const item = {
      ...formData,
      id: projects.length,
      name: formData.name ? formData.name : "Untitled project",
    };
    if (id) {
      projects.filter((project, key) => {
        if (project.id === Number(id)) {
          projects[key] = formData;
        } else {
          return project;
        }
      });
      dispatch(updateProject(projects));
    } else {
      projects.push(item);
      dispatch(addProject(item));
    }
    localStorage.setItem("projects", JSON.stringify(projects));
    handleClose();
    clearState();
  };

  return (
    <Modal open={open} onClose={handleClose} className="modal">
      <div className="modal__content">
        <form className="form" onSubmit={handleFormSubmit} noValidate>
          <div
            className={
              options.disabled
                ? "form__element form__disabled"
                : "form__element"
            }
            onClick={() => setOptions({ disabled: false, toolbar: false })}
          >
            <input
              id="name"
              disabled={options.disabled}
              className="form__input"
              placeholder="Project name"
              defaultValue={formData.name}
              onBlur={handleOnBlur}
              max="200"
            />
          </div>
          <div
            className={
              options.disabled
                ? "form__element form__disabled"
                : "form__element"
            }
            onClick={() => setOptions({ disabled: false, toolbar: true })}
          >
            <RichTextEditor
              htmlValue={formData.description}
              options={options}
              onChange={handleOnDescriptionChange}
            />
          </div>
          <div
            className={
              options.disabled
                ? "form__element form__disabled"
                : "form__element"
            }
            onClick={() => setOptions({ disabled: false, toolbar: false })}
          >
            <Select
              className="form__select"
              value={formData.level}
              displayEmpty
              onChange={handleOnChange}
            >
              <MenuItem value="" disabled>
                Add level
              </MenuItem>
              <MenuItem className="form__select" value={1}>
                Beginner
              </MenuItem>
              <MenuItem className="form__select" value={2}>
                Middle
              </MenuItem>
              <MenuItem className="form__select" value={3}>
                Advanced
              </MenuItem>
            </Select>
          </div>
          <div
            className={
              options.disabled
                ? "form__element form__disabled"
                : "form__element"
            }
            onClick={() => setOptions({ disabled: false, toolbar: false })}
          >
            <AutoCompleteInput
              selectedItems={formData.tags}
              onChange={handleOnTagsChange}
            />
          </div>
          <div className="form__action">
            <button
              onClick={() => handleClose()}
              className="btn btn__icon btn__cancel"
            >
              close
            </button>
            <button
              disabled={options.disabled}
              className="btn btn__primary btn__icon"
              type="submit"
            >
              {id ? "edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
