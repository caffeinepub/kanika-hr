import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Migration "migration";
import Principal "mo:core/Principal";

(with migration = Migration.run)
actor {
  // Types
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

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

  // Maps
  let contactMessages = Map.empty<Text, ContactMessage>();
  let employees = Map.empty<Nat, Employee>();
  let jobPostings = Map.empty<Nat, JobPosting>();
  let candidates = Map.empty<Nat, Candidate>();
  let performanceReviews = Map.empty<Nat, PerformanceReview>();
  let courses = Map.empty<Nat, Course>();
  let enrollments = Map.empty<Nat, Enrollment>();
  let recognitions = Map.empty<Nat, Recognition>();

  // ID counters
  var employeeIdCounter = 4;
  var jobPostingIdCounter = 3;
  var candidateIdCounter = 4;
  var performanceReviewIdCounter = 2;
  var courseIdCounter = 3;
  var enrollmentIdCounter = 6;
  var recognitionIdCounter = 2;

  // Admin user
  let adminUser : Text = "kanika.hr";

  public query ({ caller }) func getEmployee(id : Nat) : async ?Employee {
    employees.get(id);
  };

  public query ({ caller }) func getAllEmployees() : async [Employee] {
    employees.values().toArray();
  };

  public shared ({ caller }) func addContactMessage(name : Text, email : Text, message : Text) : async () {
    switch (contactMessages.get(name)) {
      case (null) {
        contactMessages.add(
          name,
          {
            name;
            email;
            message;
            timestamp = Time.now();
          },
        );
      };
      case (_) {
        Runtime.trap("You already submitted a contact message with this name.");
      };
    };
  };

  public query ({ caller }) func getContactMessage(name : Text) : async ?ContactMessage {
    contactMessages.get(name);
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };

  public shared ({ caller }) func addEmployee(name : Text, department : Text, role : Text) : async Employee {
    employeeIdCounter += 1;
    let employee : Employee = {
      id = employeeIdCounter;
      name;
      department;
      role;
      xpPoints = 0;
      level = 1;
      badges = [];
      attritionRiskScore = 0;
    };
    employees.add(employeeIdCounter, employee);
    employee;
  };

  public shared ({ caller }) func updateEmployee(id : Nat, name : Text, department : Text, role : Text) : async Employee {
    switch (employees.get(id)) {
      case (null) {
        Runtime.trap("Employee not found");
      };
      case (?existing) {
        let updated : Employee = {
          id;
          name;
          department;
          role;
          xpPoints = existing.xpPoints;
          level = existing.level;
          badges = existing.badges;
          attritionRiskScore = existing.attritionRiskScore;
        };
        employees.add(id, updated);
        updated;
      };
    };
  };

  public shared ({ caller }) func deleteEmployee(id : Nat) : async () {
    employees.remove(id);
  };
};
