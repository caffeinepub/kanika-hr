import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  // Types shared with the main actor
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // New types introduced in the upgrade
  type Employee = {
    id : Nat;
    name : Text;
    department : Text;
    role : Text;
    xpPoints : Nat;
    level : Nat;
    badges : [Text];
    attritionRiskScore : Nat;
  };

  type JobPosting = {
    id : Nat;
    title : Text;
    department : Text;
    description : Text;
    requirements : [Text];
    salaryRange : Text;
    location : Text;
    employmentType : Text;
  };

  type Candidate = {
    id : Nat;
    name : Text;
    email : Text;
    resume : Text;
    jobPostingId : Nat;
    stage : Text;
    aiScreeningScore : Nat;
  };

  type PerformanceReview = {
    id : Nat;
    employeeId : Nat;
    reviewer : Text;
    rating : Nat;
    aiSummary : Text;
    goals : [Text];
    comments : Text;
  };

  type Course = {
    id : Nat;
    title : Text;
    description : Text;
    xpReward : Nat;
  };

  type Enrollment = {
    id : Nat;
    employeeId : Nat;
    courseId : Nat;
    status : Text;
    completionDate : Time.Time;
  };

  type Quests = {
    employeeId : Nat;
    questId : Nat;
    completed : Bool;
    completionTime : Time.Time;
  };

  type Recognition = {
    id : Nat;
    sender : Text;
    receiver : Text;
    message : Text;
    xpReward : Nat;
  };

  // Old stable state (from the previous canister version)
  type OldActor = {
    contactMessages : Map.Map<Text, ContactMessage>;
    adminUser : Principal;
  };

  // New stable state (after the upgrade)
  type NewActor = {
    contactMessages : Map.Map<Text, ContactMessage>;
    employees : Map.Map<Nat, Employee>;
    employeeIdCounter : Nat;
    jobPostings : Map.Map<Nat, JobPosting>;
    jobPostingIdCounter : Nat;
    candidates : Map.Map<Nat, Candidate>;
    candidateIdCounter : Nat;
    performanceReviews : Map.Map<Nat, PerformanceReview>;
    performanceReviewIdCounter : Nat;
    courses : Map.Map<Nat, Course>;
    courseIdCounter : Nat;
    enrollments : Map.Map<Nat, Enrollment>;
    enrollmentIdCounter : Nat;
    recognitions : Map.Map<Nat, Recognition>;
    recognitionIdCounter : Nat;
    adminUser : Text;
  };

  public func run(old : OldActor) : NewActor {
    {
      // Carry over existing contact messages
      contactMessages = old.contactMessages;

      // Initialize new persistent fields
      employees = Map.empty<Nat, Employee>();
      employeeIdCounter = 4;
      jobPostings = Map.empty<Nat, JobPosting>();
      jobPostingIdCounter = 3;
      candidates = Map.empty<Nat, Candidate>();
      candidateIdCounter = 4;
      performanceReviews = Map.empty<Nat, PerformanceReview>();
      performanceReviewIdCounter = 2;
      courses = Map.empty<Nat, Course>();
      courseIdCounter = 3;
      enrollments = Map.empty<Nat, Enrollment>();
      enrollmentIdCounter = 6;
      recognitions = Map.empty<Nat, Recognition>();
      recognitionIdCounter = 2;

      // Convert adminUser to Text type
      adminUser = "kanika.hr";
    };
  };
};
