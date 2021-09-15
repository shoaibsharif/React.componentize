import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import axios from "axios";
import { produce } from "immer";
import React, { Component, Fragment } from "react";
import toast from "react-hot-toast";
import ApplicationErrors from "../components/ApplicationErrors";
import { status } from "../lib/constants";

class Friends extends Component {
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
    },
  };
  fetchPage = (page) => {
    const currentPageData = this.state.pages.get(page);
    if (currentPageData) {
      // return the data that exist on pages Map
      this.setState(() =>
        produce(this.state, (draft) => {
          draft.data = currentPageData;
        })
      );
    } else {
      // get the page data and store them in current page
      axios
        .get(`/techcompanies?pageIndex=${page}&pageSize=6`)
        .then((res) => {
          if (res.data?.item) {
            this.setState(() =>
              produce(this.state, (draft) => {
                draft.data = JSON.parse(JSON.stringify(res.data.item));
                draft.pages.set(
                  res.data.item.pageIndex,
                  JSON.parse(JSON.stringify(res.data.item))
                );
              })
            );
          }
        })
        .catch((e) => {
          toast.error(e?.response.data?.errors?.join());
        });
    }
  };
  fetchNextFriends = () => {
    if (this.state.data.hasNextPage) {
      this.fetchPage(this.state.data.pageIndex + 1);
    }
  };
  fetchPreviousFriends = () => {
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
    this.fetchNextFriends();
  }
  onChangeInput = (e) => {
    this.setState(
      produce(this.state, (draft) => {
        draft.formState[e.target.name] = e.target.value;
      })
    );
  };
  openNewFriendModal = () => {
    this.setState((prev) =>
      produce(prev, (draft) => {
        draft.formState = {
          title: "",
          bio: "",
          summary: "",
          headline: "",
          slug: "",
          statusId: status[0],
          primaryImage: "",
        };
      })
    );
    this.openModal();
  };
  createTechCompany = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/friends", {
        ...this.state.formState,
      });
      if (data.item)
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
    } catch (error) {
      this.setState({ ...this.state, errors: error.response?.data.errors });
    }
  };
  editFriendModal = (item) => {
    this.setState(
      produce(this.state, (draft) => {
        draft.formState = {
          ...item,
        };
      })
    );
    this.openModal();
  };
  updateFriend = async (e) => {
    e.preventDefault();
    const { entityTypeId, dateCreated, dateModified, ...rest } =
      this.state.formState;
    try {
      await axios.put(`/friends/${rest.id}`, { ...rest });
      this.closeModal();
      this.setState(
        produce(this.state, (draft) => {
          // find the page data from Map pages state
          const currentPageData = draft.pages.get(draft.data.pageIndex);

          // find the index by matching the id
          const index = currentPageData.pagedItems.findIndex(
            (item) => item.id === rest.id
          );

          // if index has been found update the data
          if (index !== -1) {
            currentPageData.pagedItems[index] = {
              ...this.state.formState,
              primaryImage: {
                ...currentPageData.pagedItems[index].primaryImage,
                imageUrl: this.state.formState.primaryImage,
              },
            };
            draft.data = currentPageData;
          }
        })
      );
      toast.success("Friend Successfully updated");
    } catch (error) {
      console.log(error);
      this.setState({ ...this.state, errors: error.response?.data.errors });
    }
  };

  submitForm = (e) => {
    if (this.state.formState?.id) this.updateFriend(e);
    else this.createTechCompany(e);
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
              onClick={this.fetchPreviousFriends}
              disabled={!this.state.data.hasPreviousPage}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              className="primary-button disabled:opacity-50 disabled:hover:bg-blue-100 disabled:cursor-not-allowed"
              onClick={this.fetchNextFriends}
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
                    <form className="mt-5 space-y-4" onSubmit={this.submitForm}>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="name">Title</label>
                        <input
                          type="text"
                          name="title"
                          id="name"
                          placeholder="Title"
                          value={this.state.formState.title}
                          onChange={this.onChangeInput}
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="bio">Bio</label>
                        <input
                          type="text"
                          name="bio"
                          id="bio"
                          value={this.state.formState.bio}
                          onChange={this.onChangeInput}
                          placeholder="Please type name"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="summary">Summary</label>
                        <input
                          type="text"
                          name="summary"
                          id="summary"
                          value={this.state.formState.summary}
                          onChange={this.onChangeInput}
                          placeholder="Summary"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="headline">Headline</label>
                        <input
                          type="text"
                          name="headline"
                          id="headline"
                          value={this.state.formState.headline}
                          onChange={this.onChangeInput}
                          placeholder="Headline"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label htmlFor="slug">Slug</label>
                        <input
                          name="slug"
                          id="slug"
                          value={this.state.formState.slug}
                          onChange={this.onChangeInput}
                          placeholder="Slug"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="status">Status</label>
                        <Listbox
                          value={this.state.formState.statusId}
                          onChange={(value) =>
                            this.setState((prev) =>
                              produce(prev, (draft) => {
                                draft.formState.statusId = value;
                              })
                            )
                          }
                        >
                          <div className="relative">
                            <Listbox.Button className="relative w-full px-3 py-2 text-left border border-gray-300 rounded appearance-none focus:ring focus:outline-none">
                              <span className="block truncate">
                                {this.state.formState.statusId}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white">
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
                      {/* <div className="flex flex-col space-y-2">
                        <label htmlFor="primaryImage">Primary Image</label>
                        <input
                          name="primaryImage"
                          id="primaryImage"
                          placeholder="Please enter an image url"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                          value={this.state.formState.primaryImage}
                          onChange={this.onChangeInput}
                        />
                      </div> */}
                      <div className="mt-4">
                        <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                          Save
                        </button>
                      </div>
                    </form>
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

export default Friends;
