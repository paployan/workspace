import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <div className="ql-container" />,
});

const RichTextEditor = ({ htmlValue = "", onChange, options }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = ["bold", "italic", "underline", "list", "bullet"];

  return (
    <QuillNoSSRWrapper
      onChange={onChange}
      value={htmlValue}
      className={
        options.toolbar ? "form__element" : "form__element hide-toolbar"
      }
      placeholder="Description"
      theme="snow"
      readOnly={options.disabled}
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
