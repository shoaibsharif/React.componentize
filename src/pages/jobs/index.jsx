import ConfirmationModal from "@/components/ConfirmationModal";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { produce } from "immer";
import debounce from "lodash.debounce";
import React, { Component, Fragment } from "react";
import toast from "react-hot-toast";
import { withRouter } from "react-router-dom";

class Jobs extends Component {
  state = {
    pages: new Map(),
    searchPages: new Map(),
    data: {
      type: "page",
      pagedItems: [],
      pageIndex: -1,
      totalPages: 1,
      hasNextPage: true,
      hasPreviousPage: false,
    },
    isModelOpen: false,
    selectedJob: null,
    searchTerm: "",
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
        .get(`/jobs?pageIndex=${page}&pageSize=6`)
        .then((res) => {
          if (res.data?.item) {
            this.setState(() =>
              produce(this.state, (draft) => {
                draft.data = JSON.parse(JSON.stringify(res.data.item));
                draft.data.type = "page";
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
          this.setState(() =>
            produce(this.state, (draft) => {
              draft.data.hasNextPage = false;
            })
          );
        });
    }
  };
  fetchNextFriends = () => {
    if (this.state.data.hasNextPage) {
      if (this.state.data.type === "page")
        this.fetchPage(this.state.data.pageIndex + 1);
      else
        this.fetchSearchPage(
          this.state.data.pageIndex + 1,
          this.state.searchTerm
        );
    }
  };
  fetchPreviousFriends = () => {
    if (this.state.data.hasPreviousPage) {
      if (this.state.data.type === "page")
        this.fetchPage(this.state.data.pageIndex - 1);
      else
        this.fetchSearchPage(
          this.state.data.pageIndex - 1,
          this.state.searchTerm
        );
    }
  };
  componentDidMount() {
    if (!this.state.pages.get(0)) {
      this.fetchNextFriends();
    }
  }

  createJob = async () => {
    this.props.history.push("/jobs/form");
  };

  deleteFried = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      this.setState(
        produce(this.state, (draft) => {
          // find the page data from Map pages state
          const currentPageData = draft.pages.get(draft.data.pageIndex);
          const index = currentPageData.findIndex((item) => item.id === id);
          if (index !== -1) {
            currentPageData.splice(index, 1);
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  openModal = () => {
    this.setState((prev) => ({ ...prev, isModelOpen: true }));
  };
  closeModal = () => {
    this.setState((prev) => ({ ...prev, isModelOpen: false, errors: [] }));
  };

  fetchSearchPage = async (page = 0, value) => {
    if (this.state.searchPages.get(page) && value === this.state.searchTerm) {
      const currentPageData = this.state.pages.get(0);
      this.setState((prev) =>
        produce(prev, (draft) => {
          draft.data = currentPageData;
        })
      );
    } else {
      axios
        .get(`/jobs/search?pageIndex=${page}&pageSize=10&searchTerm=${value}`)
        .then((res) => {
          if (res.data?.item) {
            this.setState((prev) =>
              produce(prev, (draft) => {
                draft.data = JSON.parse(JSON.stringify(res.data.item));
                draft.data.type = "search";

                draft.searchPages.set(
                  res.data.item.pageIndex,
                  JSON.parse(JSON.stringify(res.data.item))
                );
              })
            );
          }
        })
        .catch((e) => {
          if (e.response.status == 404 && value !== "") {
            this.setState((prev) =>
              produce(prev, (draft) => {
                draft.data = {
                  type: "search",
                  pagedItems: [],
                  pageIndex: 0,
                  totalPages: 1,
                  hasNextPage: false,
                  hasPreviousPage: false,
                };
              })
            );
          } else {
            const currentPageData = this.state.pages.get(0);
            this.setState((prev) =>
              produce(prev, (draft) => {
                draft.data = currentPageData;
              })
            );
          }
        });
    }
  };
  onSearch = debounce((e) => {
    this.fetchSearchPage(0, e.target.value);
    this.setState((prev) =>
      produce(prev, (draft) => {
        draft.searchTerm = e.target.value;
      })
    );
  }, 1000);
  render() {
    return (
      <>
        <section className="container">
          <div className="mt-5 ml-auto">
            <button
              type="button"
              onClick={this.createJob}
              className="px-4 py-2 text-sm font-medium text-white transition bg-black bg-opacity-50 rounded-md hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              New Job
            </button>
          </div>
        </section>
        <section className="container mt-10">
          <input
            type="search"
            className="w-full rounded"
            onChange={this.onSearch}
          />
          <div className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-3 lg:grid-cols-4">
            {this.state.data.pagedItems.map((item) => (
              <div
                className="p-6 transition transform rounded shadow cursor-pointer hover:scale-105"
                key={item.id}
                onClick={() => {
                  this.setState((prev) =>
                    produce(prev, (draft) => {
                      draft.isModelOpen = true;
                      draft.selectedJob = item;
                    })
                  );
                }}
              >
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                </div>
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
                    onClick={() =>
                      this.props.history.push("/jobs/form?jobId=" + item.id, {
                        job: item,
                      })
                    }
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
                <div className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-x-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <button
                    onClick={this.closeModal}
                    className="absolute rounded appearance-none right-3 top-3 focus:outline-none focus:ring focus:ring-blue-700"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                  <div className="mt-2">
                    {this.state.selectedJob && (
                      <pre>
                        {JSON.stringify(this.state.selectedJob, undefined, 2)}
                      </pre>
                    )}
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

export default withRouter(Jobs);
