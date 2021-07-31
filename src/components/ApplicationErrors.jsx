const ApplicationErrors = ({ errors = [], ...props }) => (
  <>
    {errors.length > 0 && (
      <div {...props}>
        <div className="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>

        <ul className="mt-3 text-sm text-red-600 list-disc list-inside">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default ApplicationErrors;
