import ApplicationErrors from "@/components/ApplicationErrors";
import { status } from "@/lib/constants";
import TechCompanyService from "@/lib/TechCompanyService";
import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/outline";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import produce from "immer";
import React, { createRef } from "react";
import { FilePond } from "react-filepond";
import { withRouter } from "react-router";

class TechCompanyId extends React.Component {
  formikRef = createRef();
  state = {
    form: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: status[1],
      urls: [""],
      logo: "",
    },
  };
  initForm = (res) => {
    if (res?.data?.item) {
      this.setState((prev) => {
        const newState = { ...prev.form };
        const item = res.data.item;
        newState["name"] = item.name;
        newState["profile"] = item.profile;
        newState["headline"] = item.headline;
        newState["summary"] = item.summary;
        newState["contactInformation"] = item.contactInformation?.data ?? "";
        newState["slug"] = item.slug ?? "";
        newState["statusId"] = item.statusId;
        if (item.urls?.length > 0) {
          const urls = item.urls.map((url) => url.url);
          newState["urls"] = urls;
        }
        return { form: { ...newState } };
      });
    }
  };
  componentDidMount() {
    TechCompanyService.show(this.props.match.params?.id).then(this.initForm);
  }
  onUpdateForm = (res) => {
    this.props.history.push("/techcompanies");
  };
  submitForm = (values, formikHelper) => {
    const techCompanyId = this.props.match?.params?.id;
    if (techCompanyId) {
      TechCompanyService.update({ id: techCompanyId, data: values }).then(
        (res) => {
          this.onUpdateForm(res);
          formikHelper.setSubmitting(false);
        }
      );
    }
  };
  render() {
    return (
      <div className="w-full max-w-lg px-5 mx-auto mt-2">
        <ApplicationErrors errors={this.state.errors} />

        <Formik
          innerRef={this.formikRef}
          initialValues={this.state.form}
          enableReinitialize
          validationSchema={TechCompanyService.TechCompanySchema}
          onSubmit={this.submitForm}
        >
          {(formProps) => (
            <Form className="mt-5 space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  placeholder="Name"
                  id="name"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:ring-blue-600/50 focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="summary">Summary</label>
                <Field
                  type="text"
                  name="summary"
                  id="summary"
                  placeholder="Summary"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="profile">Profile</label>
                <Field
                  type="text"
                  name="profile"
                  id="profile"
                  placeholder="profile"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="profile"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="headline">Headline</label>
                <Field
                  type="text"
                  name="headline"
                  id="headline"
                  placeholder="Headline"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="headline"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="slug">Slug</label>
                <Field
                  name="slug"
                  id="slug"
                  placeholder="Slug"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="slug"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="contactInformation">Contact Information</label>
                <Field
                  name="contactInformation"
                  id="contactInformation"
                  placeholder="Contact Information"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="contactInformation"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="status">Status</label>
                <Listbox
                  value={formProps.values.statusId}
                  onChange={(value) => {
                    formProps.setFieldValue("statusId", value);
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-full px-3 py-2 text-left border border-gray-300 rounded appearance-none focus:ring focus:outline-none">
                      <span className="block truncate">
                        {formProps.values.statusId}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-20 w-full py-1 mt-1 overflow-auto bg-white">
                      {status.map((stat, statIdx) => (
                        <Listbox.Option
                          key={statIdx}
                          className={({ active }) =>
                            `${
                              active ? "text-indigo-900 bg-indigo-100" : null
                            } cursor-default select-none relative py-2 px-4 `
                          }
                          value={stat}
                        >
                          {({ selected }) => (
                            <>
                              {stat}
                              {selected && (
                                <CheckIcon className="absolute w-5 h-5 text-indigo-900 transform -translate-y-1/2 right-2 top-1/2" />
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="file">Logo</label>
                {formProps.values?.logo ? (
                  <figure className="relative">
                    <img src={formProps.values.logo} alt="logo" />
                    <button
                      type="button"
                      onClick={() => {
                        formProps.setFieldValue("logo", "");
                      }}
                      className="absolute p-2 bg-red-500 bg-opacity-50 rounded-md backdrop-blur backdrop-filter right-4 top-2 text-dark hover:bg-opacity-60"
                    >
                      <XIcon className="w-6 h-6 text-white" />
                    </button>
                  </figure>
                ) : (
                  <FilePond
                    name="file"
                    server={{
                      url: "https://api.remotebootcamp.dev/api/files",
                      process: { withCredentials: true },
                    }}
                    acceptedFileTypes={["image/*"]}
                    onprocessfile={(error, file) => {
                      if (error) return;
                      formProps.setFieldValue(
                        "logo",
                        JSON.parse(file.serverId).items[0]
                      );
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <FieldArray name="urls">
                  {({ insert, remove, push }) => (
                    <div className="flex flex-col gap-5">
                      {formProps.values.urls.length > 0 &&
                        formProps.values.urls.map((url, urlIdx) => (
                          <div key={urlIdx}>
                            <div className="flex gap-3">
                              <Field
                                placeholder="Enter a url"
                                name={`urls.${urlIdx}`}
                                className="flex-grow w-full px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                              />
                              {formProps.values.urls.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(urlIdx)}
                                  className="p-3 bg-red-500 rounded"
                                >
                                  <XIcon className="w-5 h-5 text-white" />
                                </button>
                              )}
                            </div>
                            <ErrorMessage
                              name={`urls.${urlIdx}`}
                              component="div"
                              className="text-sm text-red-500"
                            />
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          push("");
                        }}
                        className="p-3 mt-3 text-white bg-blue-500 rounded"
                      >
                        Add another URL
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="mt-4">
                <button
                  disabled={formProps.isSubmitting}
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(TechCompanyId);
