namespace Starblazor.Shared.Model
{
    public class ReportModel
    {
        // Student and Course details - Mandatory
        public string name { get; set; } = string.Empty;
        public string course { get; set; } = string.Empty;
        public string result { get; set; } = string.Empty;
        public string review { get; set; } = string.Empty;
        public string date { get; set; } = string.Empty;

        // Unit 1 Data - Optionally entered
        public string unit1Code { get; set; } = string.Empty;
        public string status1 { get; set; } = string.Empty;
        public string element1Resolved { get; set; } = string.Empty;
        public string remedial1Required { get; set; } = string.Empty;
        public string remedial1Actions { get; set; } = string.Empty;

        // Unit 2 Data - Optionally entered
        public string unit2Code { get; set; } = string.Empty;
        public string status2 { get; set; } = string.Empty;
        public string element2Resolved { get; set; } = string.Empty;
        public string remedial2Required { get; set; } = string.Empty;
        public string remedial2Actions { get; set; } = string.Empty;
    }
}