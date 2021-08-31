import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApplicationErrors from "@/components/ApplicationErrors";
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Listbox } from "@headlessui/react";
import { produce } from "immer";
import CreatableSelect from "react-select/creatable";

const jobStatus = ["NotSet", "Active", "Deleted", "Flagged"];

class JobForm extends Component {
  state = {
    techCompanies: { pagedItems: [] },
    isSelectSkillLoading: false,
    jobForm: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: jobStatus[1],
      skills: [],
      techCompanyId: {},
    },
    errors: [],
    skills: [],
  };
  onChangeInput = (e) => {
    this.setState(
      produce(this.state, (draft) => {
        draft.jobForm[e.target.name] = e.target.value;
      })
    );
  };
  componentDidMount() {
    axios.get("/techcompanies?pageIndex=0&pageSize=10").then((res) => {
      this.setState((prev) =>
        produce(prev, (draft) => {
          draft.techCompanies = res.data.item;
          draft.jobForm.techCompanyId = res.data.item.pagedItems[0];
        })
      );
    });
    axios.get("/skills").then((res) =>
      this.setState((prev) =>
        produce(prev, (draft) => {
          draft.skills = res.data.items.map((item) => ({
            value: item.id,
            label: item.name,
          }));
        })
      )
    );
  }
  createJob = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/jobs", {
        ...this.state.jobForm,
        techCompanyId: this.state.jobForm.techCompanyId?.id,
        skills: this.state.jobForm.skills.map((skillItem) => skillItem.label),
      });
      if (data.item)
        this.props.location.state = {
          id: data.item,
          ...this.state.jobForm,
        };
      this.props.history.push("/jobs");
    } catch (error) {
      this.setState({ ...this.state, errors: error.response?.data.errors });
    }
  };
  handleChangeSkills = (values) => {
    this.setState((prev) =>
      produce(prev, (draft) => {
        draft.jobForm.skills = values;
      })
    );
  };
  handleCreateSkill = async (inputValue) => {
    this.setState((prev) =>
      produce(prev, (draft) => {
        draft.isSelectSkillLoading = true;
      })
    );
    const newSkill = await axios.post("/skills", { skills: [inputValue] });
    if (newSkill?.data) {
      const newSkillModified = {
        value: newSkill.data.items[0].id,
        label: newSkill.data.items[0].name,
      };
      this.setState((prev) =>
        produce(prev, (draft) => {
          draft.skills.push(newSkillModified);
          draft.jobForm.skills.push(newSkillModified);
          draft.isSelectSkillLoading = false;
        })
      );
    }
  };
  render() {
    return (
      <div className="px-4 text-center ">
        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {!this.state.jobForm.id
              ? "Create a new Job"
              : `Edit ${this.state.jobForm.title}`}
          </h3>
          <div className="mt-2">
            <ApplicationErrors errors={this.state.errors} />
            <form className="mt-5 space-y-4" onSubmit={this.createJob}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">Title</label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  placeholder="Title"
                  value={this.state.jobForm.title}
                  onChange={this.onChangeInput}
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={this.state.jobForm.bio}
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
                  value={this.state.jobForm.summary}
                  onChange={this.onChangeInput}
                  placeholder="Summary"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="pay">Pay</label>
                <input
                  type="number"
                  name="pay"
                  id="pay"
                  value={this.state.jobForm.pay}
                  onChange={this.onChangeInput}
                  placeholder="Pay"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="slug">Slug</label>
                <input
                  name="slug"
                  id="slug"
                  value={this.state.jobForm.slug}
                  onChange={this.onChangeInput}
                  placeholder="Slug"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring focus:outline-none"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="skills">Skills</label>
                <CreatableSelect
                  isDisabled={this.state.isSelectSkillLoading}
                  isLoading={this.state.isSelectSkillLoading}
                  isMulti
                  options={this.state.skills}
                  onCreateOption={this.handleCreateSkill}
                  onChange={this.handleChangeSkills}
                  id="skills"
                  value={this.state.jobForm.skills}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="status">Status</label>
                <Listbox
                  value={this.state.jobForm.statusId}
                  onChange={(value) =>
                    this.setState((prev) =>
                      produce(prev, (draft) => {
                        draft.jobForm.statusId = value;
                      })
                    )
                  }
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-full px-3 py-2 text-left border border-gray-300 rounded appearance-none focus:ring focus:outline-none">
                      <span className="block truncate">
                        {this.state.jobForm.statusId}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded ring-opacity-60 ring ring-indigo-600">
                      {jobStatus.map((stat, statIdx) => (
                        <Listbox.Option
                          key={statIdx}
                          className={({ active }) =>
                            `${
                              active ? "text-indigo-900 bg-indigo-100" : null
                            } cursor-default select-none  py-2 px-4 relative`
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
                <label htmlFor="techCompany">Tech Company</label>
                {this.state.techCompanies.pagedItems.length > 0 && (
                  <Listbox
                    value={this.state.jobForm.techCompanyId}
                    onChange={(value) =>
                      this.setState((prev) =>
                        produce(prev, (draft) => {
                          draft.jobForm.techCompanyId = value;
                        })
                      )
                    }
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full px-3 py-2 text-left border border-gray-300 rounded appearance-none focus:ring focus:outline-none">
                        <span className="block truncate">
                          {this.state.jobForm.techCompanyId?.name}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded ring-opacity-60 ring ring-indigo-600">
                        {this.state.techCompanies.pagedItems.map(
                          (stat, statIdx) => (
                            <Listbox.Option
                              key={statIdx}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-indigo-900 bg-indigo-100"
                                    : null
                                } cursor-default select-none  py-2 px-4 relative`
                              }
                              value={stat}
                            >
                              {({ selected }) => (
                                <>
                                  {stat.name}
                                  {selected && (
                                    <CheckIcon className="absolute w-5 h-5 text-indigo-900 transform -translate-y-1/2 right-2 top-1/2" />
                                  )}
                                </>
                              )}
                            </Listbox.Option>
                          )
                        )}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                )}
              </div>
              <div className="mt-4">
                <button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(JobForm);
