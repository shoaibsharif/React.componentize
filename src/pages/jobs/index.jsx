import React from "react";

import axios from "axios";
import { Component, Fragment } from "react";
import { Transition, Dialog, Listbox } from "@headlessui/react";

import toast from "react-hot-toast";
import { produce } from "immer";

import ConfirmationModal from "@/components/ConfirmationModal";
import { withRouter } from "react-router-dom";

class Jobs extends Component {
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
      this.fetchPage(this.state.data.pageIndex + 1);
    }
  };
  fetchPreviousFriends = () => {
    if (this.state.data.hasPreviousPage) {
      this.fetchPage(this.state.data.pageIndex - 1);
    }
  };
  componentDidMount() {
    this.fetchNextFriends();
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
  render() {
    return (
      <main>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {this.state.data.pagedItems.map((item) => (
              <div
                className="p-6 transition transform rounded shadow hover:scale-105"
                key={item.id}
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
      </main>
    );
  }
}

export default withRouter(Jobs);
