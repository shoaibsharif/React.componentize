import axios from "axios";
import { Component, Fragment } from "react";
import { Transition, Dialog, Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { produce } from "immer";
import ApplicationErrors from "../components/ApplicationErrors";
import ConfirmationModal from "../components/ConfirmationModal";

const friendsStatus = ["NotSet", "Active", "Deleted", "Flagged"];

class Friends extends Component {
  state = {
    pagedItems: [],
    pageIndex: -1,
    totalPages: 1,
    hasNextPage: true,
    hasPreviousPage: false,
    isModelOpen: false,
    errors: [],
    friendForm: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: friendsStatus[0],
      primaryImage: "",
    },
  };
  fetchNextFriends = () => {
    if (this.state.hasNextPage) {
      axios
        .get(`/friends?pageIndex=${this.state.pageIndex + 1}&pageSize=10`)
        .then((res) => {
          this.setState((prev) => ({ ...prev, ...res.data?.item }));
        })
        .catch((e) => {
          toast.error(e?.response.data?.errors?.join());
        });
    }
  };
  fetchPreviousFriends = () => {
    if (this.state.hasPreviousPage) {
      axios
        .get(`/friends?pageIndex=${this.state.pageIndex - 1}&pageSize=2`)
        .then((res) => {
          this.setState((prev) => ({ ...prev, ...res.data?.item }));
        })
        .catch((e) => {
          toast.error(e?.response.data?.errors?.join());
        });
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
        draft.friendForm[e.target.name] = e.target.value;
      })
    );
  };
  openNewFriendModal = () => {
    this.setState(
      produce(this.state, (draft) => {
        draft.friendForm = {
          title: "",
          bio: "",
          summary: "",
          headline: "",
          slug: "",
          statusId: friendsStatus[0],
          primaryImage: "",
        };
      })
    );
    this.openModal();
  };
  createFriend = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/friends", { ...this.state.friendForm });
      this.closeModal();
    } catch (error) {
      this.setState({ ...this.state, errors: error.response.data.errors });
    }
  };
  editFriendModal = (item) => {
    this.setState(
      produce(this.state, (draft) => {
        const modifiedItem = {};
        Object.keys(item).forEach((key) => {
          console.log({ key });
          if (typeof item[key] === "string" && item[key] === "string") {
            modifiedItem[key] = "";
          } else if (key === "primaryImage") {
            modifiedItem[key] =
              item[key].imageUrl === "string" ? "" : item[key].imageUrl;
          } else {
            modifiedItem[key] = item[key];
          }
        });
        draft.friendForm = modifiedItem;
      })
    );
    this.openModal();
  };
  updateFriend = async (e) => {
    e.preventDefault();
    const { entityTypeId, dateCreated, dateModified, ...rest } =
      this.state.friendForm;
    try {
      await axios.put(`/friends/${rest.id}`, { ...rest });
      this.closeModal();
      this.setState(
        produce(this.state, (draft) => {
          const index = draft.pagedItems.findIndex(
            (item) => item.id === rest.id
          );
          if (index !== -1) {
            draft.pagedItems[index] = {
              ...this.state.friendForm,
              primaryImage: {
                ...draft.pagedItems[index].primaryImage,
                imageUrl: this.state.friendForm.primaryImage,
              },
            };
          }
        })
      );
      toast.success("Friend Successfully updated");
    } catch (error) {
      this.setState({ ...this.state, errors: error.response.data.errors });
    }
  };
  deleteFried = async (id) => {
    try {
      await axios.delete(`/friends/${id}`);
      this.setState(
        produce(this.state, (draft) => {
          const index = draft.pagedItems.findIndex((item) => item.id === id);
          if (index !== -1) {
            draft.pagedItems.splice(index, 1);
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  submitForm = (e) => {
    if (this.state.friendForm?.id) this.updateFriend(e);
    else this.createFriend(e);
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
              New friend
            </button>
          </div>
        </div>
        <section className="container mt-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {this.state.pagedItems.map((item) => (
              <div
                className="p-6 transition transform rounded shadow hover:scale-105"
                key={item.id}
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <div className="flex justify-end mt-10 space-x-3">
                  <ConfirmationModal
                    onConfirm={() => this.deleteFried(item.id)}
                    title="Deleting friend"
                    description="Are you sure you want to delete this friend?"
                  >
                    {(openModal) => (
                      <button
                        className="capitalize red-button"
                        onClick={openModal}
                      >
                        delete
                      </button>
                    )}
                  </ConfirmationModal>
                  <button
                    className="primary-button"
                    onClick={() => this.editFriendModal(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-10 space-x-3">
            <button
              className="capitalize primary-button disabled:opacity-50 disabled:hover:bg-blue-100 disabled:cursor-not-allowed"
              onClick={this.fetchPreviousFriends}
              disabled={!this.state.hasPreviousPage}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              className="primary-button disabled:opacity-50 disabled:hover:bg-blue-100 disabled:cursor-not-allowed"
              onClick={this.fetchNextFriends}
              disabled={!this.state.hasNextPage}
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
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {this.state.friendForm.title === ""
                      ? "Create a new friend"
                      : `Edit ${this.state.friendForm.title}`}
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
                          value={this.state.friendForm.title}
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
                          value={this.state.friendForm.bio}
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
                          value={this.state.friendForm.summary}
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
                          value={this.state.friendForm.headline}
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
                          value={this.state.friendForm.slug}
                          onChange={this.onChangeInput}
                          placeholder="Slug"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="status">Status</label>
                        <Listbox
                          value={this.state.friendForm.statusId}
                          onChange={(value) =>
                            this.setState((prev) =>
                              produce(prev, (draft) => {
                                draft.friendForm.statusId = value;
                              })
                            )
                          }
                        >
                          <div className="relative">
                            <Listbox.Button className="relative w-full px-3 py-2 text-left border border-gray-300 rounded appearance-none focus:ring focus:outline-none">
                              <span className="block truncate">
                                {this.state.friendForm.statusId}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white">
                              {friendsStatus.map((stat, statIdx) => (
                                <Listbox.Option
                                  key={statIdx}
                                  className={({ active }) =>
                                    `${
                                      active
                                        ? "text-indigo-900 bg-indigo-100"
                                        : null
                                    } cursor-default select-none relative py-2 px-4`
                                  }
                                  value={stat}
                                >
                                  {stat}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="primaryImage">Primary Image</label>
                        <input
                          name="primaryImage"
                          id="primaryImage"
                          placeholder="Please enter an image url"
                          className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                          value={this.state.friendForm.primaryImage}
                          onChange={this.onChangeInput}
                        />
                      </div>
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
