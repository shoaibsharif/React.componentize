import ApplicationErrors from "@/components/ApplicationErrors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { Component } from "react";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { enUS } from "date-fns/locale";

export default class CreateEvent extends Component {
  state = {
    form: {
      dateStart: null,
      dateEnd: null,
      name: "",
      description: "",
      headline: "",
      summary: "",
    },
  };
  render() {
    return (
      <main className="w-full max-w-lg mx-auto">
        {/* <ApplicationErrors errors={this.state.errors} /> */}

        <Formik initialValues={this.state.form}>
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
                <label htmlFor="headline">Headline</label>
                <Field
                  type="text"
                  name="headline"
                  id="headline"
                  placeholder="headline"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="headline"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="description">description</label>
                <Field
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="description"
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
                <label htmlFor="slug">slug</label>
                <Field
                  type="text"
                  name="slug"
                  id="slug"
                  placeholder="slug"
                  className="px-3 py-2 border border-gray-300 rounded appearance-none focus:ring-blue-600/50 focus:ring focus:outline-none"
                />
                <ErrorMessage
                  name="slug"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="grid place-content-center">Date Range</label>
                <DateRangePicker
                  startDate={formProps.values.dateStart}
                  endDate={formProps.values.dateEnd}
                  onStartDateChange={(value) => {
                    formProps.setFieldValue("dateStart", value);
                  }}
                  onEndDateChange={(value) => {
                    formProps.setFieldValue("dateEnd", value);
                  }}
                  format="dd MMM yyyy"
                  locale={enUS}
                >
                  {({ startDateInputProps, endDateInputProps, focus }) => (
                    <div className="date-range">
                      <input
                        className={
                          "input" + (focus === START_DATE ? " -focused" : "")
                        }
                        {...startDateInputProps}
                        placeholder="Start date"
                      />
                      <span className="date-range_arrow" />
                      <input
                        className={
                          "input" + (focus === END_DATE ? " -focused" : "")
                        }
                        {...endDateInputProps}
                        placeholder="End date"
                      />
                    </div>
                  )}
                </DateRangePicker>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    );
  }
}
