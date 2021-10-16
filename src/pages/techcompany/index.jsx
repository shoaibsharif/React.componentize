import TechCompanyService from "@/lib/TechCompanyService";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/outline";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { produce } from "immer";
import React, { Component, Fragment } from "react";
import { FilePond } from "react-filepond";
import toast from "react-hot-toast";
import ApplicationErrors from "@/components/ApplicationErrors";
import { status } from "@/lib/constants";
import { withRouter } from "react-router";

class TechCompany extends Component {
  loading = false;
  state = {
    pages: new Map(),
    data: {
      pagedItems: [],
      pageIndex: -1,
      totalPages: 1,
      hasNextPage: true,
      hasPreviousPage: false,
    },
    isModelOpen: false,
    errors: [],
    formState: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: status[1],
      url: [""],
      logo: "",
    },
  };
  onGetTechCompanies = (res) => {
    this.loading = false;
    if (res.data?.item) {
      this.setState((prev) =>
        produce(prev, (draft) => {
          draft.data = JSON.parse(JSON.stringify(res.data.item));
          draft.pages.set(
            res.data.item.pageIndex,
            JSON.parse(JSON.stringify(res.data.item))
          );
        })
      );
    }
  };
  onErrorAction = (e) => {
    this.loading = false;
    console.error(e);

    // toast.error(e?.response.data?.errors?.join());
  };
  fetchPage = (page) => {
    const currentPageData = this.state.pages.get(page);
    if (currentPageData) {
      // return the data that exist on pages Map
      this.setState((prev) =>
        produce(prev, (draft) => {
          draft.data = currentPageData;
        })
      );
    } else {
      // get the page data and store them in current page
      this.loading = true;
      TechCompanyService.index(page)
        .then(this.onGetTechCompanies)
        .catch(this.onErrorAction);
    }
  };
  fetchNextPage = () => {
    if (this.state.data.hasNextPage) {
      this.fetchPage(this.state.data.pageIndex + 1);
    }
  };
  fetchPreviousPage = () => {
    if (this.state.data.hasPreviousPage) {
      this.fetchPage(this.state.data.pageIndex - 1);
    }
  };
  openModal = () => {
    this.setState((prev) => ({ ...prev, isModelOpen: true }));
  };
  closeModal = () => {
    this.setState((prev) => ({ ...prev, isModelOpen: false, errors: [] }));
  };
  componentDidMount() {
    this.fetchNextPage();
  }
  openNewFriendModal = () => {
    this.setState((prev) =>
      produce(prev, (draft) => {
        draft.formState = {
          name: "",
          profile: "",
          summary: "",
          headline: "",
          contactInformation: "",
          slug: "",
          statusId: status[1],
          urls: [""],
          logo: "",
        };
      })
    );
    this.openModal();
  };
  onCreateTechCompany = (id) => {
    if (id)
      this.setState((prev) =>
        produce(prev, (draft) => {
          const firstPage = draft.pages.get(1);

          firstPage.pagedItems.unshift({
            id: data.item,
            ...this.state.formState,
          });
        })
      );
    this.closeModal();
  };
  onFormError = (error) => {
    this.setState({ ...this.state, errors: error.response?.data.errors });
  };
  createTechCompany = (data) =>
    TechCompanyService.store(data)
      .then((response) => this.onCreateTechCompany(response.data.item, data))
      .catch(this.onFormError);

  editFriendModal = (item) => {
    this.props.history.push(`/techcompanies/${item.id}/edit`);
    // this.openModal();
  };
  onUpdateFormSuccess = () => {
    this.closeModal();
    this.loading = false;
    this.setState(
      produce(this.state, (draft) => {
        // find the page data from Map pages state
        const currentPageData = draft.pages.get(draft.data.pageIndex);

        // find the array index of the item by id
        const index = currentPageData.pagedItems.findIndex(
          (item) => item.id === rest.id
        );

        // if index has been found update the data
        if (index !== -1) {
          currentPageData.pagedItems[index] = {
            ...this.state.formState,
          };
          draft.data = currentPageData;
        }
      })
    );
    toast.success("Friend Successfully updated");
  };
  handleFormError = (error) => {
    this.setState({ ...this.state, errors: error.response?.data.errors });
  };
  updateTechCompany = async (e) => {
    const { entityTypeId, dateCreated, dateModified, ...rest } =
      this.state.formState;
    this.loading = true;
    TechCompanyService.update({ id: rest.id, data: { ...rest } })
      .then(this.onUpdateFormSuccess)
      .catch(this.handleFormError);
  };

  submitForm = (values) => {
    if (this.state.formState?.id) this.updateTechCompany(values);
    else this.createTechCompany(values);
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="mt-5 ml-auto">
            <button
              type="button"
              onClick={this.openNewFriendModal}
              className="px-4 py-2 text-sm font-medium text-white transition bg-black bg-opacity-50 rounded-md hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Create a Tech Company
            </button>
          </div>
        </div>
        <section className="container mt-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {this.state.data.pagedItems.map((item) => (
              <article
                className="p-6 transition border border-gray-700 rounded-xl card-shadow"
                key={item.id}
              >
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <h2 className="text-xl font-bold capitalize">{item.name}</h2>
                  <p>{item.summary}</p>
                </div>
                <div className="flex justify-end mt-10 space-x-3">
                  <button
                    className="primary-button"
                    onClick={() => this.editFriendModal(item)}
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="flex justify-end mt-10 space-x-3">
            <button
              className="capitalize primary-button disabled:opacity-50 disabled:hover:bg-blue-100 disabled:cursor-not-allowed"
              onClick={this.fetchPreviousPage}
              disabled={!this.state.data.hasPreviousPage}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              className="primary-button disabled:opacity-50 disabled:hover:bg-blue-100 disabled:cursor-not-allowed"
              onClick={this.fetchNextPage}
              disabled={!this.state.data.hasNextPage}
            >
              Next &rarr;
            </button>
          </div>
        </section>
        <Transition appear show={this.state.isModelOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={this.closeModal}
          >
            <div className="min-h-screen px-4 text-center bg-black bg-opacity-40">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {!this.state.formState.id
                      ? "Create a new friend"
                      : `Edit ${this.state.formState.title}`}
                  </Dialog.Title>
                  <div className="mt-2">
                    <ApplicationErrors errors={this.state.errors} />

                    <Formik
                      initialValues={this.state.formState}
                      validationSchema={TechCompanyService.TechCompanySchema}
                      onSubmit={this.submitForm}
                    >
                      {(formProps) => (
                        <Form className="mt-5 space-y-4">
                          {JSON.stringify(formProps.errors, undefined, 2)}
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
                            <label htmlFor="contactInformation">
                              Contact Information
                            </label>
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
                                          active
                                            ? "text-indigo-900 bg-indigo-100"
                                            : null
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
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
}

export default withRouter(TechCompany);
