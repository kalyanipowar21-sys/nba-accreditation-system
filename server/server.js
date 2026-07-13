const express =
require("express");

const cors =
require("cors");

const db =
require("./db");
const multer = require("multer");
const path = require("path");
/* APP */

const app =
express();

/* MIDDLEWARE */

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

const fs = require("fs");
const uploadPath = path.join(__dirname, "uploads");

const { PDFDocument } = require("pdf-lib");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({

  destination: function(req,file,cb){

    cb(null,"uploads/");

  },
filename: function(req,file,cb){

    cb(
        null,
        file.originalname
    );

}

});

const upload = multer({
  storage: storage
});
app.post(
  "/save-vision",
  upload.fields([
    { name: "visionFile", maxCount: 1 },
    { name: "missionFile", maxCount: 1 },
    { name: "peoFile1", maxCount: 1 },
    { name: "peoFile2", maxCount: 1 },
    { name: "peoFile3", maxCount: 1 }
  ]),
  async (req,res)=>{
  console.log(req.body);

  try {
const {
  vision,
  mission,
  peo1,
  peo2,
  peo3
} = req.body;

const visionFile =
  req.files["visionFile"]?.[0]?.filename || null;

const missionFile =
  req.files["missionFile"]?.[0]?.filename || null;

const peoFile1 =
  req.files["peoFile1"]?.[0]?.filename || null;

const peoFile2 =
  req.files["peoFile2"]?.[0]?.filename || null;

const peoFile3 =
  req.files["peoFile3"]?.[0]?.filename || null;
    await db.query(
      `INSERT INTO vision_mission
      (
        vision,
        mission,
        peo1,
        peo2,
        peo3,
        vision_file,
        mission_file,
        peo_file1,
        peo_file2,
        peo_file3
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        vision,
        mission,
        peo1,
        peo2,
        peo3,
        visionFile,
        missionFile,
        peoFile1,
        peoFile2,
        peoFile3
      ]
    );

    res.json({
      message: "Saved Successfully"
    });

  } catch(error) {

    console.log(error);

    res.json({
      message: "Save Error"
    });

  }

});
app.post(
  "/save-curriculum",
  upload.fields([
    { name: "tlpAttachment", maxCount: 1 },
    { name: "syllabusFile", maxCount: 1 },
    { name: "departmentSubjectsFile", maxCount: 1 },
    { name: "generalScienceFile", maxCount: 1 },
    { name: "mdmElectiveFile", maxCount: 1 },
    { name: "curriculumGapFile", maxCount: 1 },
    { name: "activityFile", maxCount: 1 }
  ]),
  async (req, res) => {
  console.log(req.body);
  console.log("BODY =", req.body);
      console.log("FILES =", req.files);

  try {
    const {
  teachingLearningProcess,
  activityName,
  facultyName
} = req.body;
    const tlpAttachment =
  req.files["tlpAttachment"]?.[0]?.filename || null;

const syllabusFile =
  req.files["syllabusFile"]?.[0]?.filename || null;

const departmentSubjectsFile =
  req.files["departmentSubjectsFile"]?.[0]?.filename || null;

const generalScienceFile =
  req.files["generalScienceFile"]?.[0]?.filename || null;

const mdmElectiveFile =
  req.files["mdmElectiveFile"]?.[0]?.filename || null;

const curriculumGapFile =
  req.files["curriculumGapFile"]?.[0]?.filename || null;

const activityFile =
  req.files["activityFile"]?.[0]?.filename || null;

    await db.query(
`
UPDATE vision_mission
SET
teaching_learning_process = $1,
tlp_attachment = $2,
syllabus_file = $3,
department_subjects_file = $4,
general_science_file = $5,
mdm_elective_file = $6,
curriculum_gap_file = $7,
activity_name = $8,
faculty_name = $9,
activity_file = $10
WHERE id = 1
`,
[
  teachingLearningProcess,
  tlpAttachment,
  syllabusFile,
  departmentSubjectsFile,
  generalScienceFile,
  mdmElectiveFile,
  curriculumGapFile,
  activityName,
  facultyName,
  activityFile
]
);
    res.json({
      message: "Curriculum Saved Successfully"
    });

  }catch (error) {
  console.log(error.message);

  res.json({
    message: error.message
  });
}

});
app.post(
  "/save-popso",
  upload.fields([
    { name: "poPsoFile", maxCount: 1 },
    { name: "mappingFile", maxCount: 1 },
    { name: "justificationFile", maxCount: 1 }
  ]),
  async (req, res) => {

    try {

      const po_pso_file =
        req.files["poPsoFile"]?.[0]?.filename || null;

      const mapping_file =
        req.files["mappingFile"]?.[0]?.filename || null;

      const justification_mapping_file =
        req.files["justificationFile"]?.[0]?.filename || null;

      await db.query(
        `
        UPDATE vision_mission
        SET
          po_pso_file = $1,
          mapping_file = $2,
          justification_mapping_file = $3
        WHERE id = 1
        `,
        [
          po_pso_file,
          mapping_file,
          justification_mapping_file
        ]
      );

      res.json({
        message: "PO PSO Saved Successfully"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

app.post(
  "/save-course-outcome",
  upload.single("outcomeFile"),
  async (req, res) => {

    try {

      console.log("BODY =", req.body);
      console.log("FILE =", req.file);

      const {
        academicYear,
        department,
        subjectCode,
        courseOutcome,
        mappedPO
      } = req.body;

      const fileName = req.file
        ? req.file.filename
        : null;

      await db.query(
        `
        INSERT INTO course_outcomes
        (
          academic_year,
          department,
          subject_code,
          course_outcome,
          mapped_po,
          outcome_file
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        `,
        [
          academicYear,
          department,
          subjectCode,
          courseOutcome,
          mappedPO,
          fileName
        ]
      );

      res.json({
        success: true,
        message: "Course Outcome Saved Successfully",
        fileName
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);



app.get("/get-course-outcomes", async (req, res) => {

  try {

    const result = await db.query(`
      SELECT *
      FROM course_outcomes
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


app.get("/get-subjects/:department", async (req, res) => {

  try {

    const { department } = req.params;

    const result = await db.query(
      `
      SELECT course_code, course_name
      FROM course_master
      WHERE department = $1
      ORDER BY course_code
      `,
      [department]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error"
    });

  }

});
app.get("/get-pos", async (req, res) => {

  const result = await db.query(
    "SELECT * FROM po_master ORDER BY id"
  );

  res.json(result.rows);

});
app.delete("/delete-course-outcome/:id",async(req,res)=>{

try{

const{id}=req.params;

await db.query(
`
DELETE FROM course_outcomes
WHERE id=$1
`,
[id]
);

res.json({
message:"Deleted Successfully"
});

}catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

});
app.get("/get-subject-co/:subjectCode", async (req, res) => {

  try {

    const { subjectCode } = req.params;

    const result = await db.query(
      `
      SELECT *
      FROM course_outcomes
      WHERE subject_code=$1
      ORDER BY id
      `,
      [subjectCode]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});
app.put(
"/update-course-outcome/:id",
upload.single("outcomeFile"),
async(req,res)=>{

try{

const {id}=req.params;

const fileName=req.file
?req.file.filename
:null;

const{
academicYear,
department,
subjectCode,
courseOutcome,
mappedPO
}=req.body;

await db.query(
`
UPDATE course_outcomes
SET
academic_year=$1,
department=$2,
subject_code=$3,
course_outcome=$4,
mapped_po=$5,
outcome_file=COALESCE($6,outcome_file)
WHERE id=$7
`,
[
academicYear,
department,
subjectCode,
courseOutcome,
mappedPO,
fileName,
id
]
);

res.json({
message:"Updated Successfully",
fileName
});

}catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

});
app.get("/get-course-outcomes/:department", async (req, res) => {

  try {

    const { department } = req.params;

    const result = await db.query(
      `
      SELECT id,
             course_outcome,
             mapped_po
      FROM course_outcomes
      WHERE department = $1
      ORDER BY id
      `,
      [department]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error"
    });

  }

});
app.get("/get-course-matrix", async (req, res) => {

  try {

    const result = await db.query(`
      SELECT *
      FROM course_matrix
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error"
    });

  }

});
app.get("/get-course-matrix-file", async (req, res) => {

  try {

    const result = await db.query(`
      SELECT matrix_file
      FROM course_matrix
      ORDER BY id DESC
      LIMIT 1
    `);

    res.json(result.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error"
    });

  }

});
app.post(
  "/save-course-matrix",
  upload.single("matrixFile"),
  async (req, res) => {

    console.log("Body =", req.body);
    console.log("File =", req.file);

    try {

      let fileName = null;

      // New file uploaded
      if (req.file) {

        fileName = req.file.filename;

      }

      // No file uploaded → use previous file
      else {

        const oldFile = await db.query(
          `
          SELECT matrix_file
          FROM course_matrix
          WHERE subject_code = $1
          ORDER BY id DESC
          LIMIT 1
          `,
          [req.body.subjectCode]
        );

        if (oldFile.rows.length > 0) {
          fileName = oldFile.rows[0].matrix_file;
        }

      }

      const {
        academicYear,
        department,
        subjectCode,
        coId,
        po1,
        po2,
        po3,
        po4,
        po5
      } = req.body;

      await db.query(
        `
        INSERT INTO course_matrix
        (
          academic_year,
          department,
          subject_code,
          co_id,
          po1,
          po2,
          po3,
          po4,
          po5,
          matrix_file
        )
        VALUES
        (
          $1,$2,$3,$4,
          $5,$6,$7,$8,$9,$10
        )
        `,
        [
          academicYear,
          department,
          subjectCode,
          coId,
          po1,
          po2,
          po3,
          po4,
          po5,
          fileName
        ]
      );

      res.json({
        message: "Course Matrix Saved Successfully",
        fileName
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);

app.post("/save-all-courses-matrix", async (req, res) => {

  try {

    const {
      department,
      courseCode,
      courseName,
      po1,
      po2,
      po3,
      po4,
      po5,
      po6,
      po7,
      po8,
      po9,
      po10,
      pso1,
      pso2,
      pso3
    } = req.body;

    await db.query(
      `
      INSERT INTO all_courses_matrix
      (
        department,
        course_code,
        course_name,
        po1,
        po2,
        po3,
        po4,
        po5,
        po6,
        po7,
        po8,
        po9,
        po10,
        pso1,
        pso2,
        pso3
      )
     VALUES
(
$1,$2,$3,
$4,$5,$6,$7,$8,
$9,$10,$11,$12,$13,
$14,$15,$16
)
      `,
      [
        department,
        courseCode,
        courseName,
        po1,
        po2,
        po3,
        po4,
        po5,
        po6,
        po7,
        po8,
        po9,
        po10,
        pso1,
        pso2,
         pso3
      ]
    );

    res.json({
      message: "Saved Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

app.get("/get-all-courses-matrix", async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT *
      FROM all_courses_matrix
      ORDER BY id
      `
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});
app.delete("/delete-all-courses-matrix/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM all_courses_matrix
      WHERE id=$1
      `,
      [id]
    );

    res.json({
      message: "Deleted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

app.put("/update-all-courses-matrix/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const {
      department,
      courseCode,
      courseName,
      po1,
      po2,
      po3,
      po4,
      po5,
      po6,
      po7,
      po8,
      po9,
      po10,
      pso1,
      pso2,
       pso3
    } = req.body;

    await db.query(
      `
      UPDATE all_courses_matrix
      SET

      department=$1,
      course_code=$2,
      course_name=$3,

      po1=$4,
      po2=$5,
      po3=$6,
      po4=$7,
      po5=$8,
      po6=$9,
      po7=$10,
      po8=$11,
      po9=$12,
      po10=$13,

      pso1=$14,
      pso2=$15,
     pso3=$16
WHERE id=$17
      `,
      [
department,
courseCode,
courseName,
po1,
po2,
po3,
po4,
po5,
po6,
po7,
po8,
po9,
po10,
pso1,
pso2,
pso3,
id
]
    );

    res.json({
      message: "Updated Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});

app.get("/get-course-master/:department", async (req, res) => {

  try {

    const { department } = req.params;

    const result = await db.query(
      `
      SELECT
        course_code,
        course_name
      FROM course_master
      WHERE department = $1
      ORDER BY course_code
      `,
      [department]
    );

    res.json(result.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});
app.get("/print-all-pdfs", async (req, res) => {
  try {

    const result = await db.query(`
      SELECT
        vision_file,
        mission_file,
        peo_file1,
        peo_file2,
        peo_file3
      FROM vision_mission
      ORDER BY id DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No Record Found"
      });
    }

    const row = result.rows[0];

    const pdfDoc = await PDFDocument.create();

    const files = [
      row.vision_file,
      row.mission_file,
      row.peo_file1,
      row.peo_file2,
      row.peo_file3
    ];

    for (const file of files) {

      if (!file) continue;

      const filePath = path.join(__dirname, "uploads", file);

      if (!fs.existsSync(filePath)) continue;

      const pdfBytes = fs.readFileSync(filePath);

      const donorPdf = await PDFDocument.load(pdfBytes);

      const pages = await pdfDoc.copyPages(
        donorPdf,
        donorPdf.getPageIndices()
      );

      pages.forEach(page => pdfDoc.addPage(page));
    }

    const mergedPdf = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=AllDocuments.pdf"
    );

    res.send(Buffer.from(mergedPdf));

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Print Error"
    });

  }
});
app.get("/print-all-curriculum-pdfs", async (req, res) => {
  try {

    const result = await db.query(`
      SELECT
        tlp_attachment,
        syllabus_file,
        department_subjects_file,
        general_science_file,
        mdm_elective_file,
        curriculum_gap_file,
        activity_file
      FROM vision_mission
      WHERE id = 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No Record Found" });
    }

    const row = result.rows[0];

    const pdfDoc = await PDFDocument.create();

    const files = [
      row.tlp_attachment,
      row.syllabus_file,
      row.department_subjects_file,
      row.general_science_file,
      row.mdm_elective_file,
      row.curriculum_gap_file,
      row.activity_file
    ];

    for (const file of files) {

      if (!file) continue;

      if (!file.toLowerCase().endsWith(".pdf")) continue;

      const filePath = path.join(__dirname, "uploads", file);

      if (!fs.existsSync(filePath)) continue;

      const pdfBytes = fs.readFileSync(filePath);

      const donorPdf = await PDFDocument.load(pdfBytes);

      const pages = await pdfDoc.copyPages(
        donorPdf,
        donorPdf.getPageIndices()
      );

      pages.forEach((page) => pdfDoc.addPage(page));
    }

    const mergedPdf = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=Curriculum.pdf"
    );

    res.send(Buffer.from(mergedPdf));

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
});

app.get("/download/:fileName", (req, res) => {

  const { fileName } = req.params;

  const filePath = path.join(
    __dirname,
    "uploads",
    fileName
  );

  res.download(filePath);

});


app.get("/print-course-documents", async (req, res) => {

  console.log("PRINT ROUTE HIT");

  try {

    const outcome = await db.query(`
      SELECT outcome_file
      FROM course_outcomes
      WHERE outcome_file IS NOT NULL
      ORDER BY id DESC
      LIMIT 1
    `);

    const matrix = await db.query(`
      SELECT matrix_file
      FROM course_matrix
      WHERE matrix_file IS NOT NULL
      ORDER BY id DESC
      LIMIT 1
    `);

    console.log("Outcome =", outcome.rows);
    console.log("Matrix =", matrix.rows);

    res.json({
      outcome: outcome.rows[0]?.outcome_file || null,
      matrix: matrix.rows[0]?.matrix_file || null
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});
app.get("/print-all-po-pso-pdfs", async (req, res) => {
   console.log("PRINT ROUTE HIT");
  try {

    const result = await db.query(`
  SELECT
    po_pso_file,
    mapping_file,
    justification_mapping_file
  FROM vision_mission
  WHERE id = 1
`);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No Record Found"
      });
    }

    const pdfDoc = await PDFDocument.create();
    
const row = result.rows[0];

console.log("ROW =", row);
const files = [
  row.po_pso_file,
  row.mapping_file,
  row.justification_mapping_file
];
console.log("FILES =", files);
    for (const file of files) {

      if (!file) continue;

      if (!file.toLowerCase().endsWith(".pdf")) continue;

      const filePath = path.join(__dirname, "uploads", file);

      if (!fs.existsSync(filePath)) continue;

      const pdfBytes = fs.readFileSync(filePath);

      const donorPdf = await PDFDocument.load(pdfBytes);

      const pages = await pdfDoc.copyPages(
        donorPdf,
        donorPdf.getPageIndices()
      );

      pages.forEach(page => pdfDoc.addPage(page));
    }

    const mergedPdf = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=PO-PSO.pdf"
    );

    res.send(Buffer.from(mergedPdf));

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }
});


app.post(
  "/api/memberships",
  upload.single("document"),
  async (req, res) => {
    try {

      const {
        faculty_name,
        membership_name,
        professional_society,
        membership_type,
        from_date,
        to_date
      } = req.body;

      const document = req.file
        ? req.file.filename
        : null;

      const result = await db.query(
        `
        INSERT INTO memberships
        (
          faculty_name,
          membership_name,
          professional_society,
          membership_type,
          from_date,
          to_date,
          document
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
        `,
        [
  faculty_name,
  membership_name,
  professional_society,
  membership_type,
  from_date || null,
  to_date || null,
  document
]
      );

      res.status(201).json({
        success: true,
        message: "Membership Saved Successfully",
        data: result.rows[0]
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }
);
app.get("/api/memberships", async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT *
      FROM memberships
      ORDER BY id DESC
      `
    );

    res.json(result.rows);

  } catch (error) {

  console.log(error);

  if (error.response) {
    console.log(error.response.data);
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }

}

});
app.delete("/api/memberships/:id", async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM memberships WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "Record Deleted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});
app.post(
  "/api/resource-persons",
  upload.single("document"),
  async (req, res) => {
    try {

      const {
        faculty_name,
        event_name,
        organization_name,
        topic,
        event_date,
        academic_year
      } = req.body;

      const document = req.file ? req.file.filename : null;

      const result = await db.query(
        `INSERT INTO resource_persons
        (faculty_name,event_name,organization_name,topic,event_date,academic_year,document)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
          faculty_name,
          event_name,
          organization_name,
          topic,
          event_date || null,
          academic_year,
          document
        ]
      );

      res.json({
        success: true,
        message: "Record Saved Successfully",
        data: result.rows[0]
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
});
app.get("/api/resource-persons", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM resource_persons ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
app.delete("/api/resource-persons/:id", async (req, res) => {

    try {

        await db.query(
            "DELETE FROM resource_persons WHERE id=$1",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
app.post("/api/participations", upload.single("document"), async (req, res) => {

  try {

    const {
      faculty_name,
      programme_name,
      organization,
      venue,
      from_date,
      to_date,
      academic_year
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO participations
      (
        faculty_name,
        programme_name,
        organization,
        venue,
        from_date,
        to_date,
        academic_year,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        faculty_name,
        programme_name,
        organization,
        venue,
        from_date || null,
        to_date || null,
        academic_year,
        document
      ]
    );

    res.json({
      success: true,
      message: "Participation Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.get("/api/participations", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM participations ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/participations/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM participations WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post("/api/moocs", upload.single("document"), async (req, res) => {

  try {

    const {
      faculty_name,
      course_name,
      platform,
      duration,
      certificate_number
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO moocs
      (
        faculty_name,
        course_name,
        platform,
        duration,
        certificate_number,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        faculty_name,
        course_name,
        platform,
        duration,
        certificate_number,
        document
      ]
    );

    res.json({
      success: true,
      message: "MOOCs Record Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
app.get("/api/moocs", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM moocs ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
app.delete("/api/moocs/:id", async (req,res)=>{

  try{

    await db.query(
      "DELETE FROM moocs WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success:true,
      message:"Deleted Successfully"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
app.post("/api/fdp-records", upload.single("document"), async (req, res) => {

  try {

    const {
      program_name,
      coordinator_name,
      start_date,
      end_date,
      participants
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO fdp_records
      (
        program_name,
        coordinator_name,
        start_date,
        end_date,
        participants,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        program_name,
        coordinator_name,
        start_date,
        end_date,
        participants,
        document
      ]
    );

    res.json({
      success: true,
      message: "FDP Record Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.get("/api/fdp-records", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM fdp_records ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/fdp-records/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM fdp_records WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post("/api/student-projects", upload.single("document"), async (req, res) => {

  try {

    const {
      faculty_name,
      student_name,
      project_title,
      competition,
      academic_year
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO student_projects
      (
        faculty_name,
        student_name,
        project_title,
        competition,
        academic_year,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        faculty_name,
        student_name,
        project_title,
        competition,
        academic_year,
        document
      ]
    );

    res.json({
      success: true,
      message: "Student Project Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.get("/api/student-projects", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM student_projects ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/student-projects/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM student_projects WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post("/api/internships", upload.single("document"), async (req, res) => {

  try {

    const {
      faculty_name,
      company_name,
      training_type,
      from_date,
      to_date
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO internships
      (
        faculty_name,
        company_name,
        training_type,
        from_date,
        to_date,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        faculty_name,
        company_name,
        training_type,
        from_date,
        to_date,
        document
      ]
    );

    res.json({
      success: true,
      message: "Internship Record Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.get("/api/internships", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM internships ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/internships/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM internships WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post("/api/academic-research", upload.single("document"), async (req, res) => {

  try {

    const {
      faculty_name,
      journal_papers,
      conference_papers,
      books_published,
      academic_year
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO academic_research
      (
        faculty_name,
        journal_papers,
        conference_papers,
        books_published,
        academic_year,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        faculty_name,
        journal_papers,
        conference_papers,
        books_published,
        academic_year,
        document
      ]
    );

    res.json({
      success: true,
      message: "Academic Research Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.get("/api/academic-research", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM academic_research ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/academic-research/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM academic_research WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post("/api/development-activities", upload.single("document"), async (req, res) => {

  try {

    const {
      faculty_name,
      activity_type,
      title,
      status,
      academic_year
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO development_activities
      (
        faculty_name,
        activity_type,
        title,
        status,
        academic_year,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        faculty_name,
        activity_type,
        title,
        status,
        academic_year,
        document
      ]
    );

    res.json({
      success: true,
      message: "Development Activity Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.get("/api/development-activities", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM development_activities ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/development-activities/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM development_activities WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post("/api/sponsored-research", upload.single("document"), async (req, res) => {

  try {

    const {
      project_title,
      pi_name,
      co_pi_name,
      department,
      funding_agency,
      sanction_amount,
      duration,
      sanction_year
    } = req.body;

    const document = req.file ? req.file.filename : null;

    const result = await db.query(
      `INSERT INTO sponsored_research
      (
        project_title,
        pi_name,
        co_pi_name,
        department,
        funding_agency,
        sanction_amount,
        duration,
        sanction_year,
        document
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        project_title,
        pi_name,
        co_pi_name,
        department,
        funding_agency,
        sanction_amount,
        duration,
        sanction_year,
        document
      ]
    );

    res.json({
      success: true,
      message: "Sponsored Research Saved Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
app.get("/api/sponsored-research", async (req,res)=>{

  try{

    const result=await db.query(
      "SELECT * FROM sponsored_research ORDER BY id DESC"
    );

    res.json(result.rows);

  }catch(err){

    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
app.delete("/api/sponsored-research/:id", async (req,res)=>{

  try{

    await db.query(
      "DELETE FROM sponsored_research WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success:true,
      message:"Deleted Successfully"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });

  }

});
app.post(
  "/api/consultancy-work",
  upload.single("document"),
  async (req, res) => {
    try {

      const {
        faculty_name,
        consultancy_title,
        client_name,
        amount,
        duration
      } = req.body;

      const document = req.file ? req.file.filename : null;

      const result = await db.query(
        `INSERT INTO consultancy_work
        (
          faculty_name,
          consultancy_title,
          client_name,
          amount,
          duration,
          document
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [
          faculty_name,
          consultancy_title,
          client_name,
          amount,
          duration,
          document
        ]
      );

      res.json({
        success: true,
        message: "Consultancy Record Saved Successfully",
        data: result.rows[0]
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message
      });

    }
  }
);
app.get("/api/consultancy-work", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM consultancy_work ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/consultancy-work/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM consultancy_work WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.post(
  "/api/seed-money",
  upload.single("document"),
  async (req, res) => {

    try {

      const {
        faculty_name,
        project_title,
        grant_amount,
        academic_year,
        status
      } = req.body;

      const document = req.file ? req.file.filename : null;

      const result = await db.query(

        `INSERT INTO seed_money
        (
          faculty_name,
          project_title,
          grant_amount,
          academic_year,
          status,
          document
        )
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`,

        [
          faculty_name,
          project_title,
          grant_amount,
          academic_year,
          status,
          document
        ]

      );

      res.json({
        success: true,
        message: "Seed Money Record Saved Successfully",
        data: result.rows[0]
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message
      });

    }

  }
);
app.get("/api/seed-money", async (req, res) => {

  try {

    const result = await db.query(
      "SELECT * FROM seed_money ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
app.delete("/api/seed-money/:id", async (req, res) => {

  try {

    await db.query(
      "DELETE FROM seed_money WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Deleted Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
/* SERVER */

app.listen(
5000,
()=>{

 console.log(
 "Server Running"
 );

});