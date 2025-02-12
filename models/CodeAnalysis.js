const mongoose = require("mongoose")

const codeAnalysisSchema = new mongoose.Schema({
  code_snippet: String,
  analysis: {
    structure: {
      num_lines: Number,
      num_functions: Number,
      avg_indentation: Number,
    },
    naming_conventions: {
      num_camel_case: Number,
      num_snake_case: Number,
    },
    coding_patterns: {
      uses_list_comprehension: Boolean,
      uses_lambda: Boolean,
      uses_decorators: Boolean,
      uses_docstrings: Boolean,
      uses_exception_handling: Boolean,
      uses_classes: Boolean,
      uses_inheritance: Boolean,
      cyclomatic_complexity: Number,
    },
    uses_built_in_functions: {
      print: Boolean,
      len: Boolean,
      range: Boolean,
      type: Boolean,
      input: Boolean,
      open: Boolean,
      sum: Boolean,
      min: Boolean,
      max: Boolean,
    },
    algorithms: Array,
  },
  timestamp: Date,
})

module.exports = mongoose.model("CodeAnalysis", codeAnalysisSchema, "codeanalysis")

